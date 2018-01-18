### 添加了 `parcel` 打包。

#### 缺点

    1. 先说说缺陷，版本号 `"parcel-bundler": "^1.4.1",` 目前为止，暂时不支持多入口

    2. style文件暂时不支持相对路径 **就是这个搞得我要去写一个脚本来一起跑js和less**

    3. 说是0配置，但是配置起来很麻烦，而且尤其对于日渐庞大的需求这个不好用

#### 优点

    1. 配置少了很多，相对于 `webpack` 编译一个js css还需要各种loader，0配置的热替换

    2. 可以直接指定 `css/html` 为入口，这个感觉像回归了一开始的三剑客时代，**webpack现在好像把js 和 css都算作一等公民了**

    3. 单入口编译速度很快，可能是因为 Webpack 之所以有时感觉很慢，是因为代码转译全靠 loader 进行字符串处理。比如一个 index.js 有可能要经历 loaderA -> loaderB -> loaderC，这些 loader 完全不知道彼此之间的存在，都是接过来一个字符串自己处理，然后再交给下一个。如果最后再 uglify 一下还要先 parse 为 AST（抽象语法树） 再压缩，这一步也是比较耗时的。用简单公式可以理解为（n 为需要 transform 的过程）

    **Webpack 打包时间 = parse string * n + transform * n + parse to AST + compress**

    而在 parcel 代码转译是先 parse 为 AST，然后再进行 transform。即便有多步转译流程，最后再加上 uglify，全部也只用 parse 一遍。用简单公式可以理解为（n 为需要 transform 的过程）

    **parcel 打包时间 = parse to AST + transform * n + compress**




###### 抽象语法树（Abstract Syntax Tree）也称为AST语法树，指的是源代码语法所对应的树状结构。也就是说，对于一种具体编程语言下的源代码，通过构建语法树的形式将源代码中的语句映射到树中的每一个节点上。
