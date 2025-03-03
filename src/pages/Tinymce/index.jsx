import React from "react";
import { Form, Button, Input } from "antd";
import Tinymce from "./tinymce";

export default function MyForm() {
	const [form] = Form.useForm();
	const onFinish = values => {
		console.log("values", values);
	};
	const initialContent = "<p>测试初始值</p>";

	return (
		<Form form={form} onFinish={onFinish} initialValues={{ content: initialContent }}>
			<Form.Item name="content" label="内容">
				<Tinymce form={form} name="content" />
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit">
					提交
				</Button>
			</Form.Item>
		</Form>
	);
}
