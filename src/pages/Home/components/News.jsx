import React from "react";
import { useNavigationType, useResolvedPath } from "react-router-dom";

export default function News() {
	return (
		<ul>
			<li>useNavigationType返回导航类型</li>
			<li>导航类型(POP刷新 PUSH堆栈 REPLASE替换)</li>
			<li>当前导航类型：{useNavigationType()}</li>
			<li>useResolvedPath--给定一个url,解析其中的path/search/hash值</li>
			<li>解析/user?id=001&name=tom#qwe的结果:{JSON.stringify(useResolvedPath("/user?id=001&name=tom#qwe"))}</li>
			<li>news001</li>
			<li>news002</li>
			<li>news003</li>
		</ul>
	);
}
