(() => {
  angular.module('App')
    .controller('StudentListCtrl', studentListCtrl);

  studentListCtrl.$inject = [
    '$scope',
    '$rootScope',
    'studentsManageService',
    'studentNoticeService',
    'memberManageService',
    'excelService',
    '$uibModal',
    '$state',
    '$stateParams',
    'STUDENT',
    'SCHEDULE_STATUSES',
    '$USER',
    'tagService',
    'studentFollowupService',
    'studentActivityService',
    'studentAttachmentService',
    'referralApplicationService',
    'OpportunityService',
    'productService',
    'callcenterService',
    'fileService',
    'CF_FILE_BASE_URL',
    'industryService',
    'professionService'
  ];

  function studentListCtrl(
    $scope,
    $rootScope,
    studentsManageService,
    studentNoticeService,
    memberManageService,
    excelService,
    $uibModal,
    $state,
    $stateParams,
    STUDENT,
    SCHEDULE_STATUSES,
    $USER,
    tagService,
    studentFollowupService,
    studentActivityService,
    studentAttachmentService,
    referralApplicationService,
    OpportunityService,
    productService,
    callcenterService,
    fileService,
    CF_FILE_BASE_URL,
    industryService,
    professionService
  ) {
    const vm = this;
    vm.searchParams = {
      itemsPerPage: 15,
      serviceStatus: '',
    };
    if ($stateParams.id) {
      vm.modifiedId = Number($stateParams.id);
    }
    vm.isAdministrator = $USER.role_id === 1 || $USER.role_id === 300;
    vm.isBD = $USER.role_id === 12 || $USER.role_id === 305;
    vm.dateOptions = {
      formatYear: 'yyyy',
      datepickerMode: 'month',
      startingDay: 1,
      minMode: 'month',
    };
    vm.serviceStatusArray = angular.copy(STUDENT.serviceStatus);
    vm.scheduleStatusArray = angular.copy(SCHEDULE_STATUSES);
    vm.scheduleStatusArray.unshift({
      id: '',
      name: '全部',
    });
    vm.serviceStatusFilterArray = angular.copy(STUDENT.serviceStatus);
    vm.serviceStatusFilterArray.unshift({
      status: '',
      name: '合同未完成',
    });
    vm.productArray = [];
    vm.targetTagArray = [];
    vm.consultantSelectorLabel = '顾问';
    vm.selectedShareStatus = {
      name: '我的学员',
      code: 1,
    };
    vm.shareStatus = [{
      name: '我的学员',
      code: 1,
    }, {
      name: '共享给我',
      code: 2,
    }, {
      name: '共享出去',
      code: 3,
    }];
    vm.degree = [{
      name: '空',
      code: 0,
    }, {
      name: '本科',
      code: 1,
    }, {
      name: '硕士',
      code: 2,
    }, {
      name: 'MBA',
      code: 3,
    }, {
      name: '博士',
      code: 4,
    }, {
      name: 'MBA',
      code: 5,
    }];
    vm.schoolType = [{
      name: '985',
      char: 'is985',
    }, {
      name: '211',
      char: 'is211',
    }, {
      name: 'QS 50',
      char: 'QS50',
    }, {
      name: 'QS 100',
      char: 'QS100',
    }];
    vm.gender = [{
      name: '空',
      code: 0,
    }, {
      name: '男',
      code: 1,
    }, {
      name: '女',
      code: 2,
    }];

    vm.clearParams = clearParams;
    vm.changeState = changeState;
    vm.pageChanged = pageChanged;
    vm.switchList = switchList;
    vm.search = search;
    vm.setupSearch = setupSearch;
    vm.updateServiceStatus = updateServiceStatus;

    vm.viewClientPage = viewClientPage;
    vm.openFilePreviewModal = openFilePreviewModal;
    vm.showFollowUpPanel = showFollowUpPanel;

    // consultant selector
    vm.searchConsultant = searchConsultant;
    vm.setStateParams = setStateParams;
    vm.importExcel = importExcel;

    activate();

    function activate() {
      vm.followupStudent = JSON.parse(sessionStorage.getItem('followupStudent'));
      const sessionFiltersParams = JSON.parse(sessionStorage.getItem(
        'studentListFilters'));
      vm.showFilterMore = sessionFiltersParams ? sessionFiltersParams.showFilterMore : false;
      vm.searchParams = Object.assign(vm.searchParams, sessionFiltersParams);
      if (vm.searchParams.gradDateFrom) {
        vm.searchParams.gradDateFrom = new Date(moment(vm.searchParams.gradDateFrom)
          .format('YYYY-MM-DD'));
      }
      if (vm.searchParams.gradDateTo) {
        vm.searchParams.gradDateTo = new Date(moment(vm.searchParams.gradDateTo)
          .format('YYYY-MM-DD'));
      }
      Promise.all([
        industryService.getList(),
        professionService.getList({
          level: 2,
        }),
        memberManageService.getMemberList(),
        productService.getList({
          getAll: true,
        })
      ])
      .then((result) => {
        vm.targetTagArray = result[0].concat(result[1]);
        vm.targetTagArray.unshift({
          id: undefined,
          name: '不限',
        });
        vm.productArray = result[3];
        search();
      });
    }

    function showFollowUpPanel(s) {
      vm.student = s;
      sessionStorage.setItem('followupStudent', JSON.stringify(s));
    }

    function openFilePreviewModal(file) {
      const params = {
        name: decodeURIComponent(file.originalName),
        src: `${CF_FILE_BASE_URL}${file.fileId}?originalName=${file.originalName}`,
        download: `${CF_FILE_BASE_URL}${file.fileId}?originalName=${file.originalName}&download=1`,
        fileId: file.fileId,
      };
      fileService.openPreviewModal(params);
    }

    function clearParams() {
      sessionStorage.removeItem('studentListFilters');
      vm.searchParams = {
        itemsPerPage: 15,
        serviceStatus: '',
      };
      changeState();
    }

    function setupSearch() {
      window.clearTimeout(vm.timeOutId);
      vm.timeOutId = window.setTimeout(changeState, 400);
    }

    function search() {
      return bindStudents(vm.searchParams);
    }

    function updateServiceStatus(s) {
      const studentId = s.id;
      const student = {
        serviceStatus: s.serviceStatus.status,
      };
      if (s.serviceStatus.status === 'contract_finish') {
        student.referralStatus = false;
        student.scheduleStatus = 'finish';
        s.scheduleStatus = 'finish';
        s.warningStatus = true;
      }
      studentsManageService.updateStudent(studentId, student)
        .then(() => {
          console.log('status updated: ', student);
        });
    }

    function importExcel(event) {
      excelService.processEvent(event, (result) => {
        const temp = studentsManageService.createStudentsFromEC(result);
        studentsManageService.exportStudents(temp.studentList);
      });
    }

    // when switch between archived or unarchived tutors
    function switchList() {
      $state.go('student.list', {
        serviceStatus: vm.archived ? 'archived' : '',
        page: 1,
      });
    }

    function setStateParams() {
      sessionStorage.setItem('stateParams', JSON.stringify(
        vm.searchParams));
    }

    // when change filter
    function changeState(params) {
      if (params === 0) {
        vm.showFilterMore = !vm.showFilterMore;
        vm.searchParams.showFilterMore = vm.showFilterMore;
        sessionStorage.setItem('studentListFilters', JSON.stringify(vm.searchParams));
        console.log('vm.searchParams=', vm.searchParams);

        return;
      }
      if (params === 1) {
        sessionStorage.setItem('studentListFilters', JSON.stringify(vm.searchParams));
        search();
        return;
      }
      if (params && params.school) {
        vm.searchParams.school = params.school;
      }
      if (params && params.consultant) {
        vm.searchParams.consultant = params.consultant;
      }
      if (vm.searchParams.shareStatus) {
        vm.searchParams.isMine = vm.searchParams.shareStatus.code;
      }
      vm.searchParams.schoolId = vm.searchParams.school ? vm.searchParams.school
        .id : null;
      vm.searchParams.consultantId = vm.searchParams.consultant ? vm.searchParams
        .consultant.id : null;
      sessionStorage.setItem('studentListFilters', JSON.stringify(vm.searchParams));
      search();
    }

    function pageChanged() {
      vm.searchParams.pageNum = vm.pageNum;
      changeState(1);
    }

    function bindStudents(params) {
      vm.students = null;
      studentsManageService.getStudentList(params)
        .then((result) => {
          const students = result.students;
          for (let i = 0; i < students.length; i++) {
            const s = students[i];
            if (s.mobile) {
              s.fullMobile = '+' + s.prefix_value + '-' + s.mobile;
            } else {
              s.noMobile = true;
              s.fullMobile = '缺失';
            }
            if (s.scheduleStatus !== 'normal') {
              s.warningStatus = true;
            }
          }
          vm.students = students.map((s) => {
            s.serviceStatus = vm.serviceStatusArray.find((ss) => {
              if (ss.status === s.serviceStatus) {
                return ss;
              }
            });
            s.professions.sort((a, b) => {
              return a.EntityProfession.priority - b.EntityProfession.priority;
            });
            s.industries.sort((a, b) => {
              return a.EntityIndustry.priority - b.EntityIndustry.priority;
            });
            if (vm.followupStudent && vm.followupStudent.id === s.id) {
              vm.student = s;
            }
            return s;
          });
          vm.totalItems = result.totalItems;
          vm.pageNum = result.pageNum;
        })
        .catch((error) => {
          console.error('getStudentList error: ', error);
        });
    }

    function searchConsultant(keyword) {
      return memberManageService.autocomplete(keyword);
    }

    function viewClientPage(id) {
      studentsManageService.getClientUrl(id)
        .then((result) => {
          window.open(result.url, '__blank');
        })
        .catch((error) => {
          if (error.status !== 403) {
            $rootScope.showAlert('获取学员中心链接失败');
          }
        });
    }
  }
})();
