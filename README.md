直接从index.html文件进入即可
# 项目完成过程中遇到的问题与解决
> 首先是label与checkbox之间出现的问题，利用label与checkbox之间进行绑定可以增大用户点击范围，提高用户体验，但是注意绑定事件时不要将事件绑定在label上，而是直接绑定在checkbox上即可，否则可能出现checkbox的状态改变失败的情况
>
>参考：[label for标签的作用 - 一条有梦想的海洋咸鱼 - 博客园 (cnblogs.com)](https://www.cnblogs.com/luojiabao/p/11170944.html)
>
>[Label 和 checkbox 不为人知的小秘密 - 断劫断念 - 博客园 (cnblogs.com)](https://www.cnblogs.com/mdengcc/p/6502108.html)

>然后是如何动态改变伪元素的样式
>
>1. 动态追加类名
>2. stylesheet.insertRule插入新样式规则
>3. 追加style标签
>
>参考：[JS 动态改变伪元素的样式 - 掘金 (juejin.cn)](https://juejin.cn/post/7116542299428880398)

> 绝对定位中同时设定top和bottom为0，那么该元素会自动上下拉伸去满足条件，left和right同理
>
> [css中top和bottom同时为0有什么用_海绵泡泡的博客-CSDN博客](https://blog.csdn.net/qq_41402809/article/details/117022321)

>  word-break属性用于设置文字的换行
>
> [word-break - CSS：层叠样式表 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/word-break)
> [CSS word-break 属性 (w3school.com.cn)](https://www.w3school.com.cn/cssref/pr_word-break.asp)

> 今天在使用flex布局后给子元素设置curser:pointer发现失效，原因是flex布局后弹性盒子在z轴上的顺序可能不合需求，这一点可以在浏览器检查元素时察觉，例如我想检查到ul下的li下的a，但是检查元素发现检查到的是ul
>
> 解决办法：使用z-index属性设置元素z轴顺序(如果z-index顺序失效，那么可能需要添加position属性)
>
> [z-index - CSS：层叠样式表 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/z-index)

> 元素隐藏与占位
>
> 想实现元素既是隐藏的又是占位的情况可以使用opacity属性
>
> [CSS隐藏元素的几种方式_css隐藏元素的方式_赤蓝紫的博客-CSDN博客](https://blog.csdn.net/chilanzi/article/details/125016604)

# 业务逻辑需求

- 需要有筛选功能，筛选事项已完成和未完成以及全部事项
- 本地存储+数组存储


- 文本框失去焦点 或 用户敲击键盘回车 则将用户输入内容加入ToDoList
- 点击每一个事项前面的小圆圈更换该事项状态(更换小圆圈背景图片)
- 左下角实时更新当前还未完成的事项
- 点击输入框左侧的下箭头，将所有的事项状态反转
- 小箭头的点亮随着完成事项的数量变化(所有事项均完成时点亮)
- 只有当前存在已经完成的事项，右下角才会显示clear completed
- clear completed点击删除所有的已完成事项
- 事项右侧叉号点击删除该事项
- 只有存在事项才会显示下边框
- 双击已存在的事项内容可以修改事项内容
- 点击页面任何地方(除修改事项的文本框)隐藏修改文本框


# 总结

- 整体项目难度不大，主要是注意各个元素之间的联系需要细心处理

