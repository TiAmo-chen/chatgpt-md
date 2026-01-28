# ChatGPT MD

🚀 将 ChatGPT、OpenRouter.ai 和本地 LLM（通过 Ollama）无缝集成到 Obsidian 中。

![通过链接讨论假期计划](images/chat-with-link.gif)

## v2.8.0 新功能 🚀
### 🆕 GPT-5 模型支持

- **最新 OpenAI 模型**：完整支持 OpenAI 最新的 GPT-5 系列：
  - `gpt-5` - 增强推理能力的旗舰模型
  - `gpt-5-mini` - 针对速度和效率优化
  - `gpt-5-nano` - 超轻量级快速响应模型
  - `gpt-5-chat-latest` - 始终更新的聊天模型
- **智能 Token 管理**：增强的 token 限制响应处理，交互更可靠
- **性能优化**：改进的消息服务架构和更好的 API 集成

## 快速开始 🏁
只需几步即可开始：

1. **安装 ChatGPT MD**：进入 `设置 > 社区插件 > 浏览`，搜索 `ChatGPT MD` 并点击 `安装`。
2. **添加 OpenAI API 密钥**：在插件设置中添加你的 OpenAI API 密钥和/或安装 Ollama 及你选择的本地 LLM。
3. **开始聊天**：使用 `ChatGPT MD: 聊天` 命令（`cmd + p` 或 `ctrl + p`）在任何笔记中开始对话。

💡 *专业提示*：设置一个热键以获得最佳体验！进入 `设置 > 快捷键`，搜索 `ChatGPT MD: 聊天` 并添加你喜欢的按键绑定（例如 `cmd + j`）。

开始聊天吧，不要太担心高级功能。它们会自然而然地出现 :-)

## 本地 LLM 设置（Ollama & LM Studio）🏠

想要保持对话私密并避免 API 费用？在 ChatGPT MD 中使用本地 LLM！

### Ollama 设置

1. **安装 Ollama**：从 [ollama.ai](https://ollama.ai) 下载并安装
2. **下载模型**：在终端运行：
   ```bash
   ollama pull llama3.2    # 或任何你选择的模型
   ollama pull qwen2.5     # 另一个热门选择
   ```
3. **配置 ChatGPT MD**：
   - 进入 `设置 > ChatGPT MD > Ollama 默认设置`
   - Ollama URL 应该已设置为 `http://localhost:11434`
   - 在设置中设置你的默认模型（例如 `ollama@llama3.2`）
4. **开始聊天**：使用 `ChatGPT MD: 聊天` 命令开始对话，或在单个笔记中覆盖设置：
   ```yaml
   ---
   model: ollama@llama3.2  # 如需要覆盖默认设置
   temperature: 0.7
   ---
   ```

### LM Studio 设置

1. **安装 LM Studio**：从 [lmstudio.ai](https://lmstudio.ai) 下载
2. **下载并加载模型**：在 LM Studio 中
3. **启动服务器**：在 LM Studio 中，进入本地服务器并启动
4. **配置 ChatGPT MD**：
   - 进入 `设置 > ChatGPT MD > LM Studio 默认设置`
   - LM Studio URL 应该设置为 `http://localhost:1234`
   - 在设置中设置你的默认模型（例如 `lmstudio@your-model-name`）
5. **开始聊天**：使用 `ChatGPT MD: 聊天` 命令开始对话，或在单个笔记中覆盖设置：
   ```yaml
   ---
   model: lmstudio@your-model-name  # 如需要覆盖默认设置
   temperature: 0.7
   ---
   ```

### 查找模型名称

- **Ollama**：在终端运行 `ollama list` 查看已安装的模型
- **LM Studio**：在模型加载时检查 LM Studio 界面中的模型名称

### 本地 LLM 重要提示

- **默认模型配置**：在设置中设置你喜欢的本地模型作为默认值 - 它的工作方式与云服务相同
- **单笔记覆盖**：你可以使用 frontmatter 在单个笔记中覆盖默认模型，与其他提供商相同
- **模型发现**：使用 `ollama list`（Ollama）或检查 LM Studio 界面来查找可用的模型名称

## 功能特性
* **交互式对话**：
  * 直接在任何 Markdown 笔记中与 ChatGPT、OpenRouter.ai 模型和 Ollama 互动，即时编辑问题或响应，无缝继续对话。
* **隐私与零 API 成本**：
  * 通过 Ollama 使用本地 LLM，将聊天保留在你的电脑上，避免 API 费用。
* **网络访问模型**：
  * 使用 OpenAI 的 `gpt-4o-search-preview` 和 Perplexity 的 `openrouter@perplexity/llama-3.1-sonar-small-128k-online`（通过 openrouter.ai）获取实时网络信息。
* **多 AI 提供商**：
  * 从 OpenAI、OpenRouter.ai（可访问 Gemini、Claude、DeepSeek、Llama、Perplexity 等模型）或通过 Ollama 的本地模型中选择。
* **系统命令**：
  * 通过系统命令指示 LLM 以获得最佳答案。
* **链接上下文**：
  * 使用 Markdown 或 Wiki 链接提供指向笔记库中任何其他笔记的链接，为对话添加上下文。
* **单笔记配置**：
  * 通过 frontmatter 使用 [OpenAI API](https://platform.openai.com/docs/api-reference/chat)、[OpenRouter.ai](https://openrouter.ai/docs) 或 [Ollama API](https://github.com/ollama/ollama/blob/main/docs/api.md#generate-a-chat-completion) 的参数为单个笔记覆盖默认设置。
* **Markdown 支持**：
  * 享受所有响应中的列表、代码块等的完整渲染。
* **最简设置**：
  * 使用你的 OpenAI API 密钥、OpenRouter.ai API 密钥或通过 Ollama 本地安装任何 LLM。
* **注释块**：
  * 使用注释块忽略笔记的某些部分。
* **聊天模板**：
  * 使用和分享重复场景的 frontmatter 模板。探索 [chatgpt-md-templates](https://github.com/bramses/chatgpt-md-templates)。

## 隐私和安全

ChatGPT MD
- 仅在你的笔记库中本地存储数据，零跟踪，除直接调用 AI API（OpenAI、OpenRouter.ai）外没有第三方集成
- 允许你使用 Ollama，一个本地 LLM 安装，用于基于离线对话的知识探索

### 默认配置
插件带有良好平衡的预配置，可让你立即开始。
你可以更改全局设置或在任何笔记中通过 frontmatter 使用本地参数
（在笔记的第一行输入 `---` 来添加属性）
```
---
system_commands: ['You are a helpful assistant.']
temperature: 0.3
top_p: 1
max_tokens: 300
presence_penalty: 0.5
frequency_penalty: 0.5
stream: true
stop: null
n: 1
model: gpt-5-mini

# 服务特定 URL（可选，如未指定将使用全局设置）
openaiUrl: https://api.openai.com
# openrouterUrl: https://openrouter.ai
# ollamaUrl: http://localhost:11434
---
```
💡 专业提示：将 `max_tokens` 增加到更高的值（例如 `4096`）以完成更复杂的任务，如推理、编码或文本创作。
默认模型 `gpt-5-mini` 针对速度和效率进行了优化。升级到 `gpt-5` 以获得增强的推理能力，或使用 `gpt-5-nano` 获得超轻量级响应。

### 多模型聊天
你可以在笔记中为每个请求设置和更改模型。
通过 frontmatter 指定 `model` 属性：

对于 OpenAI 模型（包括最新的 GPT-5 系列）
```
---
model: gpt-5  # 或 gpt-5-mini、gpt-5-nano、gpt-5-chat-latest
system_commands: [act as a senior javascript developer]
---
```
对于 Ollama 模型添加 `ollama@` 前缀，或对于 LM Studio 模型添加 `lmstudio@` 前缀。
```
---
model: ollama@gemma2:27b
temperature: 1
---
```


AI 响应将在响应标题中保留使用的模型名称以供将来参考。
你可以通过 `ollama list` 从终端查看已安装的 Ollama 模型名称列表，或在线在此 [openAI 模型](https://platform.openai.com/docs/models) 页面上查看可用的 openAI 模型名称。

### 服务 URL
每个 AI 服务都有自己的专用 URL 参数，可以在设置中全局配置或通过 frontmatter 单笔记配置：

```
---
# 对于 OpenAI
openaiUrl: https://api.openai.com

# 对于 OpenRouter
openrouterUrl: https://openrouter.ai

# 对于 Ollama
ollamaUrl: http://localhost:11434
---
```

默认 URL 为：
- OpenAI: `https://api.openai.com`
- OpenRouter: `https://openrouter.ai`
- Ollama: `http://localhost:11434`

注意：以前的版本使用单个 `url` 参数，该参数现在已被弃用。请更新你的模板和笔记以使用服务特定的 URL 参数。

### 命令 👨‍💻
通过 `cmd + p` 或 `ctrl + p` 从 Obsidian 命令面板运行命令，开始输入 `chatgpt` 或设置快捷键
（强烈推荐聊天命令快捷键以实现轻松聊天（我使用 `cmd + j`，效果很好，因为你的食指已经放在那个键上了））。

#### 主命令
- **聊天**：解析文件并与 ChatGPT 互动。分配一个快捷键，例如 `cmd + j`。

#### 创建命令
- **使用高亮文本创建新聊天**：使用高亮文本和 `聊天文件夹` 中的默认 frontmatter 开始聊天。
- **从模板创建新聊天**：从 `聊天模板文件夹` 中的模板创建聊天。

#### 实用命令
- **推断标题**：根据笔记内容自动生成笔记标题。可配置为在 4 条以上消息后自动运行。
- **添加注释块**：插入注释块以忽略笔记的某些部分。
- **选择模型**：从所有可用的 LLM（OpenAI、OpenRouter.ai、Ollama）中选择并为你的笔记设置当前模型。

#### 维护命令
- **清除聊天**：删除所有消息同时保留 frontmatter。
- **停止流式传输（仅限桌面）**：如有必要，停止正在进行的流。

#### 格式化工具
- **添加分隔线**：插入水平线以在视觉上组织内容。

## Beta 测试 🧪
想在官方发布前尝试最新功能？你可以使用 [BRAT（Beta 审查者自动更新工具）](https://github.com/TfTHacker/obsidian42-brat) 社区插件对 ChatGPT MD 进行 beta 测试：

1. 从 Obsidian 社区插件安装 BRAT 插件
2. 打开 BRAT 设置并添加 `bramses/chatgpt-md` 作为 beta 插件
3. 在 BRAT 插件设置的下拉菜单中选择 "latest version"
4. 在社区插件列表中启用 ChatGPT MD 插件

这可以让你在功能仍在开发和测试时提前访问新功能。

⚠️ **警告**：Beta 测试是有风险的，风险自负。始终在新的空笔记库上测试 beta 版本，而不是在你的主笔记库上。Beta 功能可能会损坏并可能导致数据丢失。

## 常见问题 ❓
#### 如何开始使用 ChatGPT MD 聊天？
从 Obsidian 命令面板（`cmd + p` 或 `ctrl + p`）使用 `ChatGPT MD: 聊天` 命令在任何笔记中开始对话。

#### 可以为 `ChatGPT MD: 聊天` 命令设置快捷键吗？
是的，你应该这样做！进入 `设置 > 快捷键`，搜索 `ChatGPT MD: 聊天` 并添加你喜欢的按键绑定（例如 `cmd + j`）。

#### 如何使用聊天和推理模型？
你可以使用 OpenAI 的 GPT 3 和 4 模型、通过各种模型通过 OpenRouter.ai（如 Claude、Gemini、DeepSeek、Llama、Perplexity），或你通过 Ollama 安装的任何模型。
DeepSeek-r1:7b 通过 Ollama 在本地进行推理效果很好。

#### 如何使用自定义端点？
确保你的自定义 API 遵守 OpenAI 的规范，例如 Azure 托管的端点。请咨询你的提供商以了解 API 密钥管理详细信息。

#### 应该在哪里添加我的 OpenAI API 密钥？
在插件设置中，添加你的 OpenAI API 密钥和/或安装 Ollama 和你选择的本地 LLM。

#### frontmatter 中的 'url' 参数发生了什么？
单个 'url' 参数现在已被弃用。在 v2.2.0 及更高版本中，我们引入了服务特定的 URL 参数：`openaiUrl`、`openrouterUrl` 和 `ollamaUrl`。这允许在配置不同服务时具有更大的灵活性和清晰度。请相应地更新你的模板和笔记。

🤖 在你的 Obsidian 笔记库中探索 ChatGPT MD 的强大功能！🚀

## 欢迎贡献 🤝
欢迎并高度鼓励拉取请求、错误报告以及所有其他形式的贡献！* :octocat:

## 关于开发者 ✍️
Bram 于 2023 年 3 月创建了 ChatGPT MD，住在纽约，正在构建 [Your Commonbase](https://bramses.notion.site/Your-Commonbase-ALPHA-10b034182ddd8038b9ffe11cc2833713)（一个零压力存储、搜索和共享的自组织剪贴簿）。他的个人网站和时事通讯位于 [bramadams.dev](https://www.bramadams.dev/)

Deniz 于 2024 年加入 Bram 继续开发。他在德国的一家游戏公司工作，在工作中和私人生活中大量使用 AI。在 Bluesky 上打个招呼：[Deniz](https://bsky.app/profile/denizokcu.bsky.social)

使用 ChatGPT MD 愉快写作！💻 🎉
