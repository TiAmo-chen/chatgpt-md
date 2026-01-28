import { App, Plugin, PluginSettingTab, Setting } from "obsidian";
import { ChatGPT_MDSettings } from "src/Models/Config";
import { DEFAULT_DATE_FORMAT, ROLE_IDENTIFIER, ROLE_USER } from "src/Constants";
import { DEFAULT_OPENAI_CONFIG } from "src/Services/OpenAiService";
import { DEFAULT_OPENROUTER_CONFIG } from "src/Services/OpenRouterService";
import { DEFAULT_OLLAMA_CONFIG } from "src/Services/OllamaService";
import { DEFAULT_LMSTUDIO_CONFIG } from "src/Services/LmStudioService";
import { DEFAULT_ANTHROPIC_CONFIG } from "src/Services/AnthropicService";
import { DEFAULT_GEMINI_CONFIG } from "src/Services/GeminiService";

interface SettingDefinition {
  id: keyof ChatGPT_MDSettings;
  name: string;
  description: string;
  type: "text" | "textarea" | "toggle" | "dropdown";
  placeholder?: string;
  options?: Record<string, string>;
  group: string;
}

interface SettingsProvider {
  settings: ChatGPT_MDSettings;
  saveSettings: () => Promise<void>;
}

export class ChatGPT_MDSettingsTab extends PluginSettingTab {
  settingsProvider: SettingsProvider;

  constructor(app: App, plugin: Plugin, settingsProvider: SettingsProvider) {
    super(app, plugin);
    this.settingsProvider = settingsProvider;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    // Define settings schema
    const settingsSchema: SettingDefinition[] = [
      // API Keys
      {
        id: "apiKey",
        name: "OpenAI API 密钥",
        description: "OpenAI 的 API 密钥",
        type: "text",
        placeholder: "你的 OpenAI API 密钥",
        group: "API 密钥",
      },
      {
        id: "openrouterApiKey",
        name: "OpenRouter.ai API 密钥",
        description: "OpenRouter.ai 的 API 密钥",
        type: "text",
        placeholder: "你的 OpenRouter API 密钥",
        group: "API 密钥",
      },
      {
        id: "anthropicApiKey",
        name: "Anthropic API 密钥",
        description: "Anthropic (Claude) 的 API 密钥",
        type: "text",
        placeholder: "你的 Anthropic API 密钥",
        group: "API 密钥",
      },
      {
        id: "geminiApiKey",
        name: "Gemini API 密钥",
        description: "Google Gemini (Google AI Studio) 的 API 密钥",
        type: "text",
        placeholder: "你的 Gemini API 密钥",
        group: "API 密钥",
      },

      // Chat Behavior
      {
        id: "defaultChatFrontmatter",
        name: "默认聊天 Frontmatter",
        description:
          "新聊天文件的默认 frontmatter。你可以在这里更改/使用 OpenAI API 暴露的所有设置：https://platform.openai.com/docs/api-reference/chat/create",
        type: "textarea",
        placeholder: this.settingsProvider.settings.defaultChatFrontmatter,
        group: "聊天行为",
      },
      {
        id: "pluginSystemMessage",
        name: "插件系统消息",
        description:
          "提供关于 Obsidian/ChatGPT MD 插件环境上下文的系统消息。这有助于 AI 理解它在 Obsidian 中工作并适当地格式化响应。",
        type: "textarea",
        group: "聊天行为",
      },
      {
        id: "stream",
        name: "流式响应",
        description: "从 OpenAI 流式传输响应",
        type: "toggle",
        group: "聊天行为",
      },
      {
        id: "generateAtCursor",
        name: "在光标处生成",
        description: "在光标处生成文本而不是在文件末尾",
        type: "toggle",
        group: "聊天行为",
      },
      {
        id: "autoInferTitle",
        name: "自动推断标题",
        description: "在交换 4 条消息后自动推断标题",
        type: "toggle",
        group: "聊天行为",
      },
      {
        id: "inferTitleLanguage",
        name: "标题推断语言",
        description: "用于标题推断的语言。",
        type: "dropdown",
        options: {
          英语: "English",
          日语: "Japanese",
          西班牙语: "Spanish",
          法语: "French",
          德语: "German",
          中文: "Chinese",
          韩语: "Korean",
          意大利语: "Italian",
          俄语: "Russian",
        },
        group: "聊天行为",
      },

      // OpenAI Defaults
      {
        id: "openaiUrl",
        name: "OpenAI API 地址",
        description: `OpenAI API 的 URL\n默认地址: ${DEFAULT_OPENAI_CONFIG.url}`,
        type: "text",
        placeholder: DEFAULT_OPENAI_CONFIG.url,
        group: "OpenAI 默认设置",
      },
      {
        id: "openaiDefaultModel",
        name: "默认 OpenAI 模型",
        description: "OpenAI 聊天的默认模型",
        type: "text",
        placeholder: "openai@gpt-4",
        group: "OpenAI 默认设置",
      },
      {
        id: "openaiDefaultTemperature",
        name: "默认 OpenAI Temperature",
        description: "OpenAI 聊天的默认Temperature（0.0 到 2.0）",
        type: "text",
        placeholder: "0.7",
        group: "OpenAI 默认设置",
      },
      {
        id: "openaiDefaultMaxTokens",
        name: "默认 OpenAI 最大令牌数",
        description: "OpenAI 聊天的默认最大令牌数",
        type: "text",
        placeholder: "400",
        group: "OpenAI 默认设置",
      },

      // Anthropic Defaults
      {
        id: "anthropicUrl",
        name: "Anthropic API 地址",
        description: `Anthropic API 的 URL\n默认地址: ${DEFAULT_ANTHROPIC_CONFIG.url}`,
        type: "text",
        placeholder: DEFAULT_ANTHROPIC_CONFIG.url,
        group: "Anthropic 默认设置",
      },
      {
        id: "anthropicDefaultModel",
        name: "默认 Anthropic 模型",
        description: "Anthropic 聊天的默认模型",
        type: "text",
        placeholder: "anthropic@claude-3-5-sonnet-20241022",
        group: "Anthropic 默认设置",
      },
      {
        id: "anthropicDefaultTemperature",
        name: "默认 Anthropic Temperature",
        description: "Anthropic 聊天的默认Temperature（0.0 到 1.0）",
        type: "text",
        placeholder: "0.7",
        group: "Anthropic 默认设置",
      },
      {
        id: "anthropicDefaultMaxTokens",
        name: "默认 Anthropic 最大令牌数",
        description: "Anthropic 聊天的默认最大令牌数",
        type: "text",
        placeholder: "400",
        group: "Anthropic 默认设置",
      },

      // Gemini Defaults
      {
        id: "geminiUrl",
        name: "Gemini API 地址",
        description: `Gemini API 的 URL\n默认地址: ${DEFAULT_GEMINI_CONFIG.url}`,
        type: "text",
        placeholder: DEFAULT_GEMINI_CONFIG.url,
        group: "Gemini 默认设置",
      },
      {
        id: "geminiDefaultModel",
        name: "默认 Gemini 模型",
        description: "Gemini 聊天的默认模型",
        type: "text",
        placeholder: "gemini@gemini-1.5-pro",
        group: "Gemini 默认设置",
      },
      {
        id: "geminiDefaultTemperature",
        name: "默认 Gemini Temperature",
        description: "Gemini 聊天的默认Temperature（0.0 到 2.0）",
        type: "text",
        placeholder: "0.7",
        group: "Gemini 默认设置",
      },
      {
        id: "geminiDefaultMaxTokens",
        name: "默认 Gemini 最大令牌数",
        description: "Gemini 聊天的默认最大令牌数",
        type: "text",
        placeholder: "400",
        group: "Gemini 默认设置",
      },

      // OpenRouter Defaults
      {
        id: "openrouterUrl",
        name: "OpenRouter.ai API 地址",
        description: `OpenRouter.ai API 的 URL\n默认地址: ${DEFAULT_OPENROUTER_CONFIG.url}`,
        type: "text",
        placeholder: DEFAULT_OPENROUTER_CONFIG.url,
        group: "OpenRouter 默认设置",
      },
      {
        id: "openrouterDefaultModel",
        name: "默认 OpenRouter 模型",
        description: "OpenRouter 聊天的默认模型",
        type: "text",
        placeholder: "openrouter@anthropic/claude-3.5-sonnet",
        group: "OpenRouter 默认设置",
      },
      {
        id: "openrouterDefaultTemperature",
        name: "默认 OpenRouter Temperature",
        description: "OpenRouter 聊天的默认Temperature（0.0 到 2.0）",
        type: "text",
        placeholder: "0.7",
        group: "OpenRouter 默认设置",
      },
      {
        id: "openrouterDefaultMaxTokens",
        name: "默认 OpenRouter 最大令牌数",
        description: "OpenRouter 聊天的默认最大令牌数",
        type: "text",
        placeholder: "400",
        group: "OpenRouter 默认设置",
      },

      // Ollama Defaults
      {
        id: "ollamaUrl",
        name: "Ollama API 地址",
        description: `Ollama API 的 URL\n默认地址: ${DEFAULT_OLLAMA_CONFIG.url}`,
        type: "text",
        placeholder: DEFAULT_OLLAMA_CONFIG.url,
        group: "Ollama 默认设置",
      },
      {
        id: "ollamaDefaultTemperature",
        name: "默认 Ollama Temperature",
        description: "Ollama 聊天的默认Temperature（0.0 到 2.0）",
        type: "text",
        placeholder: "0.7",
        group: "Ollama 默认设置",
      },

      // LM Studio Defaults
      {
        id: "lmstudioUrl",
        name: "LM Studio API 地址",
        description: `LM Studio API 的 URL\n默认地址: ${DEFAULT_LMSTUDIO_CONFIG.url}`,
        type: "text",
        placeholder: DEFAULT_LMSTUDIO_CONFIG.url,
        group: "LM Studio 默认设置",
      },
      {
        id: "lmstudioDefaultTemperature",
        name: "默认 LM Studio Temperature",
        description: "LM Studio 聊天的默认Temperature（0.0 到 2.0）",
        type: "text",
        placeholder: "0.7",
        group: "LM Studio 默认设置",
      },

      // Folders
      {
        id: "chatFolder",
        name: "聊天文件夹",
        description: "聊天文件所在的文件夹路径",
        type: "text",
        group: "文件夹",
      },
      {
        id: "chatTemplateFolder",
        name: "聊天模板文件夹",
        description: "聊天文件模板所在的文件夹路径",
        type: "text",
        placeholder: "chat-templates",
        group: "文件夹",
      },

      // Formatting
      {
        id: "dateFormat",
        name: "日期格式",
        description: "聊天文件的日期格式。有效的日期块为：YYYY、MM、DD、hh、mm、ss",
        type: "text",
        placeholder: DEFAULT_DATE_FORMAT,
        group: "格式化",
      },
      {
        id: "headingLevel",
        name: "标题级别",
        description: `消息的标题级别（标题级别 2 的示例：'## ${ROLE_IDENTIFIER}${ROLE_USER}'）。有效的标题级别为 0、1、2、3、4、5、6`,
        type: "text",
        group: "格式化",
      },

      // Tool Calling
      {
        id: "enableToolCalling",
        name: "启用 AI 工具调用（实验性功能，仅限阅读）",
        description:
          "隐私保护：所有工具调用都需要你的明确批准，LLM 才能看到数据。 " +
          "允许 AI 使用工具：搜索文件、读取文件内容、网络搜索（注重隐私的 Brave Search API）。 ",
        type: "toggle",
        group: "工具调用",
      },
      {
        id: "toolEnabledModels",
        name: "可使用工具的模型",
        description:
          "可以使用工具的模型白名单。每行一个模式。 " +
          "支持使用 * 通配符（例如 gpt-4* 匹配 gpt-4o、gpt-4-turbo）。 " +
          "模型名称匹配时不包含提供商前缀。",
        type: "textarea",
        placeholder: "gpt-5.2-*",
        group: "工具调用",
      },

      // Web Search (requires tool calling)
      {
        id: "enableWebSearch",
        name: "启用网络搜索",
        description:
          "允许 AI 使用 Brave Search 搜索网络信息。 " +
          "需要启用工具调用。 " +
          "需要免费的 Brave Search API 密钥（每月 1,000 次查询）。 " +
          "获取地址：https://api.search.brave.com/",
        type: "toggle",
        group: "工具调用",
      },
      {
        id: "webSearchApiKey",
        name: "Brave Search API 密钥",
        description: "Brave Search 的 API 密钥。",
        type: "text",
        placeholder: "你的 Brave Search API 密钥",
        group: "工具调用",
      },
      {
        id: "webSearchProvider",
        name: "备用搜索提供商",
        description: "使用自定义搜索 API 端点代替 Brave Search",
        type: "dropdown",
        options: {
          brave: "Brave Search（默认）",
          custom: "自定义 API 端点",
        },
        group: "工具调用",
      },
      {
        id: "webSearchApiUrl",
        name: "自定义搜索 API URL",
        description: "自定义搜索 API 端点的 URL（仅在使用自定义提供商时）",
        type: "text",
        placeholder: "https://your-search-api.com/search",
        group: "工具调用",
      },
      {
        id: "maxWebSearchResults",
        name: "最大网络搜索结果数",
        description: "返回的最大搜索结果数（1-10）",
        type: "text",
        placeholder: "5",
        group: "工具调用",
      },
      {
        id: "debugMode",
        name: "调试模式",
        description: "启用详细日志以调试工具操作。消息将显示在控制台中。",
        type: "toggle",
        group: "工具调用",
      },
    ];

    // Group settings by category
    const groupedSettings: Record<string, SettingDefinition[]> = {};
    settingsSchema.forEach((setting) => {
      if (!groupedSettings[setting.group]) {
        groupedSettings[setting.group] = [];
      }
      groupedSettings[setting.group].push(setting);
    });

    // Create settings UI
    Object.entries(groupedSettings).forEach(([group, settings]) => {
      containerEl.createEl("h3", { text: group });

      settings.forEach((setting) => {
        this.createSettingElement(containerEl, setting);
      });

      containerEl.createEl("hr");
    });
  }

  createSettingElement(container: HTMLElement, schema: SettingDefinition) {
    // Regular handling for all settings
    const setting = new Setting(container).setName(schema.name).setDesc(schema.description);

    if (schema.type === "text") {
      setting.addText((text) => {
        text
          .setPlaceholder(schema.placeholder || "")
          .setValue(String(this.settingsProvider.settings[schema.id]))
          .onChange(async (value) => {
            (this.settingsProvider.settings[schema.id] as string) = value;
            await this.settingsProvider.saveSettings();
          });

        // Set width to match textarea
        text.inputEl.style.width = "300px";

        return text;
      });
    } else if (schema.type === "textarea") {
      setting.addTextArea((text) => {
        text
          .setPlaceholder(schema.placeholder || "")
          .setValue(String(this.settingsProvider.settings[schema.id] || schema.placeholder))
          .onChange(async (value) => {
            (this.settingsProvider.settings[schema.id] as string) = value;
            await this.settingsProvider.saveSettings();
          });

        // Set width for all textareas
        text.inputEl.style.width = "300px";

        // Special height for defaultChatFrontmatter and pluginSystemMessage
        if (schema.id === "defaultChatFrontmatter" || schema.id === "pluginSystemMessage") {
          text.inputEl.style.height = "260px";
          text.inputEl.style.minHeight = "260px";
        }

        // Medium height for toolEnabledModels
        if (schema.id === "toolEnabledModels") {
          text.inputEl.style.height = "120px";
          text.inputEl.style.minHeight = "120px";
        }

        return text;
      });
    } else if (schema.type === "toggle") {
      setting.addToggle((toggle) =>
        toggle.setValue(Boolean(this.settingsProvider.settings[schema.id])).onChange(async (value) => {
          (this.settingsProvider.settings[schema.id] as boolean) = value;
          await this.settingsProvider.saveSettings();
        })
      );
    } else if (schema.type === "dropdown" && schema.options) {
      setting.addDropdown((dropdown) => {
        dropdown.addOptions(schema.options || {});
        dropdown.setValue(String(this.settingsProvider.settings[schema.id]));
        dropdown.onChange(async (value) => {
          (this.settingsProvider.settings[schema.id] as string) = value;
          await this.settingsProvider.saveSettings();
        });

        // Set width to match textarea
        dropdown.selectEl.style.width = "300px";

        return dropdown;
      });
    }
  }
}
