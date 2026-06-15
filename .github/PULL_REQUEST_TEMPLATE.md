## 变更类型

<!-- 勾选所有适用项 -->
- [ ] 新增博客文章
- [ ] 新增独立笔记
- [ ] 新增/修改课程笔记
- [ ] 新增/修改教程笔记
- [ ] 站点功能/组件修改
- [ ] 样式/布局调整
- [ ] 文档/模板更新

## 变更说明

<!-- 简要描述本次变更的内容和原因 -->


## 新增课程笔记时的 Checklist

<!-- 如果本次 PR 不涉及新课程，可删除本节 -->

- [ ] `docGroup` 已注册在 `src/consts.ts` 的 `NOTE_COURSES` 或 `NOTE_TUTORIALS` 中
- [ ] README.md 存在且 `order: -1`
- [ ] 所有章节 `.md` 文件有完整 frontmatter
- [ ] `npm run validate` 通过
- [ ] `npm run build` 通过

## 自查

- [ ] 本地 `npm run build` 无报错
- [ ] 新内容的 frontmatter 符合 schema（`npm run validate` 通过）
- [ ] 无临时文件、调试内容、或非发布文件混入
