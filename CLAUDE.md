# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 在此仓库中工作时提供指导。

## 项目概述

ChatGPT MD 是一个 Obsidian 插件，将多个 AI 提供商（OpenAI、OpenRouter、Anthropic、Gemini、Ollama、LM Studio）集成到 Obsidian 中，实现 markdown 笔记内的无缝聊天交互。用户可以直接在笔记中进行 AI 对话，支持笔记链接、流式响应和通过 frontmatter 进行单笔记配置。

## v3.0.0 发布 - 注重隐私的 AI 工具调用

**最新版本**：v3.0.0（2025 年 12 月）

主要新功能：**注重隐私的 AI 工具调用**，包含人工审批流程：
- **笔记库搜索**：AI 可以搜索你的笔记（你批准要分享哪些文件）
- **文件读取**：AI 可以请求访问特定文件（你选择要分享哪些）
- **网络搜索**：AI 可以通过 Brave Search API 搜索网络（每月 1,000 次免费查询）
- **三层审批**：批准执行 → 审查结果 → 选择要分享的内容
- **所有工具默认禁用**（仅限选择加入的功能）

详见 [`planning/code-review/`](planning/code-review/) 获取全面的代码审查和实现指导。

## 快速参考

**入口点**：`src/main.ts` → `main.js`

**常用命令**：
```bash
npm run dev        # 开发模式（带监听）
npm run build      # 生产构建（包含 TypeScript 类型检查）
npm run lint       # 检查代码质量
npm run lint:fix   # 自动修复 lint 问题
```

## 架构概述

插件使用 **服务定位器模式** 进行依赖注入：

- `src/core/ServiceLocator.ts` - 中央 DI 容器
- `src/core/CommandRegistry.ts` - 管理所有 Obsidian 命令
- AI 服务实现 `IAiApiService` 接口

**消息流**：用户命令 → EditorService 提取消息 → MessageService 解析 → AI 服务调用 API → 响应流式传输到编辑器

## 代码组织

每个目录都有自己的 CLAUDE.md，工作时自动加载详细上下文：

- `src/core/` - 核心基础设施（ServiceLocator、CommandRegistry）
- `src/Services/` - 服务实现
- `src/Views/` - UI 组件
- `src/Models/` - TypeScript 接口

## 跨领域文档

跨越多个领域的主题：

- **[docs/development.md](docs/development.md)** - 构建流程、工具链、esbuild 配置
- **[docs/message-flow.md](docs/message-flow.md)** - 从用户输入到 AI 响应的完整流程

## 关键设计模式

1. **服务定位器** - 集中式依赖注入
2. **策略模式** - 不同的 AI 服务，相同的接口
3. **Frontmatter 驱动配置** - 单笔记设置覆盖全局设置
4. **流式响应** - 通过 SSE 实现实时 AI 输出
5. **链接上下文注入** - 自动在提示中包含 `[[Wiki 链接]]`
