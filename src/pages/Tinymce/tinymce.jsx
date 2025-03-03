import { useState, useRef, useEffect, useMemo } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function TinyMCEEditor({ form, name, height, initContent }) {
	const editorRef = useRef(null);
	const [content, setContent] = useState("");

	useEffect(() => {
		setContent(initContent || form.getFieldValue(name));
	}, [initContent, form, name]);

	const onEditorChange = e => {
		form.setFieldsValue({ [name]: e });
	};

	const tinymceScriptSrc = useMemo(() => {
		if (window._POWERED_BY_QIANKUN_) {
			return `${window.__webpack_public_path_}tinymce/tinymce.min.js`;
		}
		return "/tinymce/tinymce.min.js";
	}, []);

	return (
		<>
			<Editor
				tinymceScriptSrc={tinymceScriptSrc} // 本地js
				licenseKey="gpl" // 设置自托管
				onInit={(_evt, editor) => (editorRef.current = editor)}
				initialValue={content}
				onEditorChange={onEditorChange}
				init={{
					height: height || 500,
					menubar: false, //隐藏菜单栏
					branding: false, //隐藏右下图标
					resize: false,
					toolbar_mode: "wrap",
					selector: "textarea",
					placeholder: "请输入内容",
					elementpath: false, //隐藏左下角路径
					language: "zh_CN",
					powerpaste_allow_local_images: true,
					automatic_uploads: true,
					file_picker_types: "image",
					autosave_ask_before_unload: false,
					content_css: false,
					table_default_attributes: {
						border: 1,
						class: "table-css"
					},
					table_default_styles: {
						"border-collapse": "collapse",
						width: "100%",
						border: "1px solid black"
					},
					file_picker_callback: (cb, value, meta) => {
						const input = document.createElement("input");
						input.setAttribute("type", "file");
						input.setAttribute("accept", "image/*");
						input.addEventListener("change", e => {
							const file = e.target.files[0];
							const reader = new FileReader();
							reader.addEventListener("load", () => {
								const id = "blobid" + new Date().getTime();
								const blobCache = editorRef.current.editorUpload.blobCache;
								const base64 = reader.result.split(",")[1];
								const blobInfo = blobCache.create(id, file, base64);
								blobCache.add(blobInfo);
								cb(blobInfo.blobUri(), { title: file.name });
							});
							reader.readAsDataURL(file);
						});
						input.click();
					},
					block_formats: "textarea=textarea; Paragraph=p; H1=h1; H2=h2; H3=h3; H4=h4; H5=h5",
					font_family_formats:
						"微软雅黑=Microsoft YaHei;宋体=simsun;黑体=simhei;仿宋=FangSong,楷体=KaiTi;微软正黑体=Microsoft JhengHei;新宋体=NSimSun;衬线字体=serif;无衬线字体=sans-serif;苹方=PingFangSC;Times New Roman;Arial=arial;helvetica;Courier New=courier new;courier;monospace;AkrutiKndPadmini=Akpdmi-n",
					font_size_formats: "11px 12px 14px 16px 18px 24px 36px 48px",
					plugins: [
						//选择需加载的插件
						"table",
						"image",
						"advlist",
						"autolink",
						"lists",
						"link",
						"charmap",
						"preview",
						"anchor",
						"searchreplace",
						"visualblocks",
						"fullscreen",
						"insertdatetime",
						"media",
						"code",
						"wordcount"
					],
					toolbar:
						"undo redo blocks bold underline lineheight fontfamily fontsize forecolor backcolor align bullist numlist image table hr removeformat fullscreen preview",
					content_style:
						"body { font-family: Helvetica, Arial,sans-serif; font-size:14px; cursor:text; min-height:100px ;.table-css{td{border-width:1px}}}"
				}}
			/>
		</>
	);
}
