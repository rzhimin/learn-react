import React from 'react'
import { useNavigationType, useResolvedPath } from 'react-router-dom'

export default function News() {
	// 返回导航类型：POP PUSH REPLASE POP刷新
	console.log(useNavigationType())
	// 给定一个url,解析其中的path/search/hash值
	console.log('@@', useResolvedPath('/user?id=001&name=tom#qwe'))
	return (
		<ul>
			<li>news001</li>
			<li>news002</li>
			<li>news003</li>
		</ul>
	)
}
