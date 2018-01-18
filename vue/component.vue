<template id="">
<div class="assess-page">
  <div class="container">
    <h1>求职竞争力评估表</h1>
    <form method="post" style="white-space:nowrap;">
      <div class="form-group item-block name-input" v-bind:class="{ 'error': submitted && !name.value}">
        <label for="name" style="margin-right:18px;">姓名: </label>
        <div style="display: inline-block;">
          &nbsp;<input type="text" name="name" class="input" placeholder="输入学员姓名" required autofocus v-model="name.value">
        </div>
      </div>
      <edu :submitted="submitted" v-model="edu"></edu>
      <!-- {{edu}} -->
      <workexp :submitted="submitted" v-model="workexp"></workexp>
      <!-- {{workexp}} -->
      <activity :submitted="submitted" v-model="activity"></activity>
      <!-- {{activity}} -->
      <overseaexp :submitted="submitted" v-model="overseaexp"></overseaexp>
      <!-- {{overseaexp}} -->
      <language-ability :submitted="submitted" v-model="languageAbility"></language-ability>
      <!-- {{languageAbility}} -->
      <personalexp :submitted="submitted" v-model="personalexp"></personalexp>
      <!-- {{personalexp}} -->
      <interested-industry :submitted="submitted" v-model="interestedIndustry"></interested-industry>
      <!-- {{interestedIndustry}} -->
      <div class="button-wrapper">
        <button class="btn yellow" type="button" name="button" @click="submit">提交</button>
      </div>
    </form>
  </div>
</div>
</template>

<script>
// 引入地址
import edu from './edu.vue';
import workexp from './work-exp.vue';
import overseaexp from './oversea-exp.vue';
import activity from './activity.vue';
import languageAbility from './language-ability.vue';
import personalexp from './personal-exp.vue';
import interestedIndustry from './interested-industry.vue';
export default {
  name: 'questionForm',
  components: { // 在组件内部先注册下components
    edu,
    workexp,
    activity,
    overseaexp,
    languageAbility,
    personalexp,
    interestedIndustry,
  },
  methods: {
    submit() {
      this.submitted = true;
      if (this.validateAll()) {
        this.$http.post('/api/assess_results', this.$data)
        .then(res => {
          window.location = `/report/${res.body.hash}`;
        })
        .catch(err => console.error(err));
      }
    },
    validateAll() {
      let validResult = true;
      for (const v in this.$data) {
        if (this.$data[v].valid !== undefined && !this.$data[v].valid) {
          validResult = false;
        }
      }
      return validResult;
    }
  },
  data() {
    return {
      submitted: false,
      name: {
        value: '',
        valid: false,
      },
      edu: {
        schoolCountry: '',
        schoolCategory: '',
        gpa: '',
        highestDegree: '',
        highestSchoolCountry: '',
        highestSchoolCategory: '',
        highestGpa: '',
      },
      workexp: {
        exp1: {
          industry: '',
          company: '',
          position: '',
          duration: '',
        },
        exp2: {
          industry: '',
          company: '',
          position: '',
          duration: '',
        },
      },
      activity: {
        organization: '',
        position: '',
        contest: '',
        award: '',
      },
      overseaexp: {
        exp: '',
      },
      languageAbility: {
        englishLevel: '',
      },
      personalexp: {
        exp: '',
      },
      interestedIndustry: {
        industries: [],
      },
    };
  },
  mounted() {
    if (window.location.search) {
      const hashId = window.location.search.split('hashId=')[1];
      if (hashId) {
        this.$http.get(`/api/detail?hash=${hashId}`)
          .then((res) => {
            const requestData = res.data;
            this.name = requestData.name;
            this.edu = requestData.edu;
            this.workexp = requestData.workexp;
            this.activity = requestData.activity;
            this.overseaexp = requestData.overseaexp;
            this.languageAbility = requestData.languageAbility;
            this.personalexp = requestData.personalexp;
            this.interestedIndustry = requestData.interestedIndustry;
          });
      }
    }
  },
  watch: {
    'name.value': {
      handler() {
        if (this.name.value) {
          this.name.valid = true;
        } else {
          this.name.valid = false;
        }
      }
    }
  }
}
</script>
