//页面刷新就读取本地数据
const data = JSON.parse(localStorage.getItem('todoData')) || []
const clearObj = document.querySelector('.clear-completed')
const toggleAllObj = document.querySelector('.toggle-all+label')
const toggleBtn = toggleAllObj.previousElementSibling
const listObj = document.querySelector('.main .list')
const todo_countObj = document.querySelector('.todo-count')
const mainObj = document.querySelector('.main')
const newToDoObj = document.querySelector('.new-todo')
const filtersObj = document.querySelector('.filters')

//得到数组中未完成的事项数量
let left = 0

// 渲染函数，将本地数据渲染到页面上
function render(choice = 1) {
  //choice为1则将所有数据都渲染，为2则只渲染未完成的数据，3则只渲染已完成的数据
  //默认渲染所有数据
  let temp = data
  //默认left数量计算
  left = data.reduce((acc, cur) => {
    return acc + (cur.completed === false ? 1 : 0)
  }, 0)
  if (choice === 2) {
    //筛选出未完成的数据
    temp = data.filter(value => value.completed === false)
  } else if (choice === 3) {
    //筛选出完成的数据
    temp = data.filter(value => value.completed === true)
  }
  const tempData = temp.map(function (item, index) {
    return `
        <li data-id="${item.id}" class="${item.completed ? 'completed' : ''}">
          <div class="view">
            <input type="checkbox" class="toggle ${item.completed ? 'completed' : ''}" ${item.completed ? 'checked' : ''}>
            <label>${item.title}</label>
            <button class="destroy">X</button>
          </div>
        </li>
    `
  })
  //将事项进行显示
  listObj.innerHTML = tempData.join('')
  //未完成事项数量的显示
  todo_countObj.innerHTML = `${left} items left`
  //存在完成事项时显示清除按钮
  clearObj.style.display = (left === data.length ? 'none' : 'block')
  //存在事项时显示箭头
  toggleAllObj.style.display = (data.length > 0 ? 'block' : 'none')
  //当所有事项均完成时将箭头颜色加深
  toggleAllObj.previousElementSibling.checked = (left === 0)
  //存在事项时才显示下边框
  mainObj.style.display = (data.length > 0 ? 'block' : 'none')
  //根据hash值改变当前显示的数据类型
  filtersObj.querySelector('.selected').classList.remove('selected')
  document.querySelector(`.${location.hash.substring(1) || 'All'}`).classList.add('selected')
}

function callRender() {
  //刷新时根据当前的URL的hash值进行判断
  const curHash = location.hash
  // console.log(curHash);
  if (curHash === '#Active') {
    render(2)
  } else if (curHash === '#Completed') {
    render(3)
  } else {
    //注意这里不能写else if(curHash === '#All')否则无法判断当前没有哈希值的情况
    render(1)
  }
}

callRender()


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
    callRender()
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

//实现删除事项功能
listObj.addEventListener('click', function (e) {
  if (e.target.tagName === 'BUTTON') {
    const cur = e.target.parentNode.parentNode.dataset.id
    //只有当前事项是未完成事项删除才会减少left值
    if (!data[cur].completed) left--
    //删除数组对应数据
    data.splice(cur, 1)
    //更新本地存储
    localStorage.setItem('todoData', JSON.stringify(data))
    //渲染页面
    callRender()
  }
})

//点击改变事项状态
listObj.addEventListener('click', function (e) {
  if (e.target.type === 'checkbox') {
    // if (e.target.tagName === 'INPUT') {
    // if (location.hash === '#All') {
    //添加类名
    // e.target.parentNode.parentNode.classList.toggle('completed')
    const cur = e.target.parentNode.parentNode.dataset.id
    //更新数组数据
    if (data[cur].completed === true) {
      data[cur].completed = false
      left++
    } else {
      data[cur].completed = true
      left--
    }
    //小箭头的点亮随着完成事项的数量变化
    toggleAllObj.previousElementSibling.checked = (left === 0)
    //clearCompleted按钮的显示隐藏
    clearObj.style.display = (left === data.length ? 'none' : 'block')
    //left数量的更新
    todo_countObj.innerHTML = `${left} items left`
    //更新本地存储
    localStorage.setItem('todoData', JSON.stringify(data))
    //这里不能使用渲染函数render()
    callRender()
    //否则会导致类名completed添加后又被移除，不能实现css样式
    if (location.hash === '#Active' || location.hash === '#Completed') {
      //如果当前筛选类型是active或completed的话，则事项状态改变直接remove该元素
      e.target.parentNode.parentNode.remove()
    }
  }
})

//清除所有已完成事项
clearObj.addEventListener('click', function () {
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].completed) {
      data.splice(i, 1)
    }
  }
  // //更新本地存储
  localStorage.setItem('todoData', JSON.stringify(data))
  //渲染页面
  const curHash = location.hash
  callRender()
})

//箭头功能的实现
toggleBtn.addEventListener('click', function () {
  // console.log(this.checked);
  if (this.checked) {
    //将所有事项变为已完成
    data.forEach(element => element.completed = true);
    //更新left值
    left = 0
  } else {
    //将所有事项变为未完成
    data.forEach(element => element.completed = false);
    left = data.length
  }
  //更新本地存储
  localStorage.setItem('todoData', JSON.stringify(data))
  //渲染页面
  callRender()
})

//事项显示类型的转换
filtersObj.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    //进行小方框的移动
    filtersObj.querySelector('.selected').classList.remove('selected')
    e.target.classList.add('selected')
  }
})

//监听url的hash值改变的事件
window.addEventListener('hashchange', () => {
  callRender()
})

// 双击触发修改内容(事件委托)
listObj.addEventListener('dblclick', (e) => {
  if (e.target.tagName === 'LABEL') {
    //给li添加editing类名
    e.target.parentNode.parentNode.classList.add('editing')
    //添加输入框
    // <input type="text" class="edit">
    const inputObj = document.createElement('input')
    inputObj.type = 'text'
    inputObj.classList.add('edit')
    inputObj.value = e.target.innerHTML
    e.target.parentNode.parentNode.appendChild(inputObj)
    //焦点改变为input框
    inputObj.focus()
  }
})

//页面点击事件
document.addEventListener('click', (e) => {
  if (e.target.className !== 'edit') reinput()
})

function reinput() {
  const editObj = document.querySelector('.todoapp > .main > ul > li.editing > input')
  //只有当前修改文本框出现时才执行
  if (editObj) {
    editObj.parentNode.classList.remove('editing')
    editObj.remove()
  }
}

listObj.addEventListener('change', (e) => {
  if (e.target.classList.contains('edit')) {
    //只有修改文本框内容(事项)时才执行
    const content = e.target.value
    const curId = e.target.parentNode.dataset.id
    //修改数组内容
    data[curId].title = content
    //更新本地存储
    localStorage.setItem('todoData', JSON.stringify(data))
    //渲染页面
    callRender()
  }
})