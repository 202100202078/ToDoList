//页面刷新就读取本地数据
const data = JSON.parse(localStorage.getItem('todoData')) || []

// 渲染函数，将本地数据渲染到页面上
function render(choice) {
  //choice为1则将所有数据都渲染，为2则只渲染未完成的数据，3则只渲染已完成的数据
  const tempData = data.map(function (item) {
    return `
        <li data-id="${item.id}">
          <div class="view">
            <input type="checkbox" class="toggle">
            <label>${item.title}</label>
            <button class="destroy">X</button>
          </div>
        </li>
    `
  })
  document.querySelector('.main .list').innerHTML = tempData.join('')
}
render(1)

const newToDoObj = document.querySelector('.new-todo')

newToDoObj.addEventListener('blur', function () {
  //用户输入非空
  if (this.value) {
    let obj = {
      //如果当前数组的最后一个元素的id存在则当前元素id相对其+1，反之为0
      id: data[data.length - 1] ? data[data.length - 1].id + 1 : 0,
      title: this.value,
      completed: false
    }
    //加入数组
    data.push(obj)
    //本地存储
    localStorage.setItem('todoData', JSON.stringify(data))
    //重新渲染
    render(1)
    //清除输入框内容
    this.value = ''
  }
})