//页面刷新就读取本地数据
const data = JSON.parse(localStorage.getItem('todoData')) || []
const clearObj = document.querySelector('.clear-completed')
let left = data.length

console.log(clearObj);

// 渲染函数，将本地数据渲染到页面上
function render(choice) {
  //choice为1则将所有数据都渲染，为2则只渲染未完成的数据，3则只渲染已完成的数据
  const tempData = data.map(function (item, index) {
    return `
        <li data-id="${index}">
          <div class="view">
            <input type="checkbox" class="toggle">
            <label>${item.title}</label>
            <button class="destroy">X</button>
          </div>
        </li>
    `
  })
  document.querySelector('.main .list').innerHTML = tempData.join('')
  document.querySelector('.todo-count').innerHTML = `${left} items left`
  clearObj.style.opacity = (left === data.length ? 0 : 1)
}
render(1)

const newToDoObj = document.querySelector('.new-todo')

function inputItem() {
  //用户输入非空
  if (newToDoObj.value) {
    let obj = {
      //如果当前数组的最后一个元素的id存在则当前元素id相对其+1，反之为0
      id: data[data.length - 1] ? data[data.length - 1].id + 1 : 0,
      title: newToDoObj.value,
      completed: false
    }
    //未完成事项数量
    left++
    //加入数组
    data.push(obj)
    //本地存储
    localStorage.setItem('todoData', JSON.stringify(data))
    //重新渲染
    render(1)
    //清除输入框内容
    newToDoObj.value = ''
  }
}

//输入框失去焦点则将用户输入加入事项
newToDoObj.addEventListener('blur', inputItem)
//输入框得到Enter则将用户输入加入事项
newToDoObj.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    inputItem()
  }
})

const listObj = document.querySelector('.main .list')
//实现删除事项功能
listObj.addEventListener('click', function (e) {
  if (e.target.tagName === 'BUTTON') {
    left--
    const cur = e.target.parentNode.parentNode.dataset.id
    //删除数组对应数据
    data.splice(cur, 1)
    //更新本地存储
    localStorage.setItem('todoData', JSON.stringify(data))
    //渲染页面
    render()
  }
})


listObj.addEventListener('click', function (e) {
  if (e.target.tagName === 'INPUT') {
    //添加类名
    e.target.classList.toggle('completed')
    const cur = e.target.parentNode.parentNode.dataset.id
    //更新数组数据
    if (data[cur].completed === true) {
      data[cur].completed = false
      left++
    } else {
      data[cur].completed = true
      left--
    }
    clearObj.style.opacity = left === data.length ? 0 : 1
    document.querySelector('.todo-count').innerHTML = `${left} items left`
    //更新本地存储
    localStorage.setItem('todoData', JSON.stringify(data))
    //这里不能使用渲染函数render()
    //否则会导致类名completed添加后又被移除，不能实现css样式
  }
})