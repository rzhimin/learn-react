import React from 'react'
// eslint-disable-next-line
import { useParams, useMatch, useSearchParams, useLocation } from 'react-router-dom'

export default function Detail() {
	// 使用params参数传递，routes文件里需要占位 
	// const { id, title, content } = useParams()
	// useMatch需要传入路径，不常用，了解即可 
	// const x = useMatch('/home/message/detail/:id/:title/:content')
	// console.log(x) //x是个对象 x.params = {id:'',...}

	// 使用search参数传递，routes文件里不需要占位 
	// const [search, setSearch] = useSearchParams()
	// const id = search.get('id')
	// const title = search.get('title')
	// const content = search.get('content')
	// 使用search参数传递时候useLocation不常用，了解即可 
	// const x = useLocation() 
	// console.log('@',x)//x是个对象 x.search = '?id=xxx&title=...'

	// 使用state参数传递时候，routes文件里不需要占位 
	const { state: { id, title, content } } = useLocation()
	return (
		<ul>
			{/* <li>
				<button onClick={()=>setSearch('id=008&title=哈哈&content=嘻嘻')}>点我更新一下收到的search参数</button>
			</li> */}
			<li>消息编号：{id}</li>
			<li>消息标题：{title}</li>
			<li>消息内容：{content}</li>
		</ul>
	)
}
