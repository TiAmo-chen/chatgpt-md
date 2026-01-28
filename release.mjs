#!/usr/bin/env node
/**
 * 发布新版本脚本
 *
 * 使用方法：
 *   node release.mjs <version>
 *
 * 示例：
 *   node release.mjs 2.14.0        # 正式版本
 *   node release.mjs 2.14.0-beta  # 测试版本
 *
 * 这个脚本会：
 * 1. 更新 package.json 版本
 * 2. 运行 version-bump.mjs 更新 manifest.json 和 versions.json
 * 3. 构建
 * 4. 创建 git commit
 * 5. 创建并推送 tag
 * 6. GitHub Actions 会自动创建 Release
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';

// 获取命令行参数
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('❌ 错误：请指定版本号');
  console.log('\n使用方法：');
  console.log('  node release.mjs <version>');
  console.log('\n示例：');
  console.log('  node release.mjs 2.14.0        # 正式版本');
  console.log('  node release.mjs 2.14.0-beta  # 测试版本');
  process.exit(1);
}

const newVersion = args[0];

// 验证版本号格式
const versionRegex = /^\d+\.\d+\.\d+(-[a-zA-Z0-9.]+)?$/;
if (!versionRegex.test(newVersion)) {
  console.error(`❌ 错误：无效的版本号格式 "${newVersion}"`);
  console.log('版本号格式应为：x.y.z 或 x.y.z-<tag>');
  console.log('示例：2.14.0 或 2.14.0-beta');
  process.exit(1);
}

console.log(`\n🚀 准备发布版本 ${newVersion}\n`);

// 步骤 1: 检查工作目录是否干净
console.log('📋 步骤 1/6: 检查工作目录...');
try {
  execSync('git diff --quiet', { stdio: 'inherit' });
  execSync('git diff --cached --quiet', { stdio: 'inherit' });
  console.log('✅ 工作目录干净\n');
} catch {
  console.error('❌ 错误：工作目录有未提交的更改，请先提交或暂存。');
  process.exit(1);
}

// 步骤 2: 更新 package.json 版本
console.log('📦 步骤 2/6: 更新 package.json...');
const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
const oldVersion = packageJson.version;
packageJson.version = newVersion;
writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
console.log(`✅ 版本从 ${oldVersion} 更新到 ${newVersion}\n`);

// 步骤 3: 运行 version-bump.mjs
console.log('📝 步骤 3/6: 更新 manifest.json 和 versions.json...');
try {
  execSync('npm run version', { stdio: 'inherit' });
  console.log('✅ manifest.json 和 versions.json 已更新\n');
} catch {
  console.error('❌ 错误：版本更新失败');
  process.exit(1);
}

// 步骤 4: 构建
console.log('🔨 步骤 4/6: 构建插件...');
try {
  execSync('node esbuild.config.mjs production', { stdio: 'inherit' });
  console.log('✅ 构建成功\n');
} catch {
  console.error('❌ 错误：构建失败');
  process.exit(1);
}

// 步骤 5: 创建 commit
console.log('💾 步骤 5/6: 创建 git commit...');
const commitMessage = `Bump version to ${newVersion}`;
try {
  execSync('git add package.json manifest.json versions.json', { stdio: 'inherit' });
  execSync(`git commit -m "${commitMessage}"`, { stdio: 'inherit' });
  console.log('✅ Commit 创建成功\n');
} catch {
  console.error('❌ 错误：创建 commit 失败');
  process.exit(1);
}

// 步骤 6: 创建并推送 tag
console.log('🏷️  步骤 6/6: 创建并推送 tag...');
const tagName = `v${newVersion}`;
try {
  execSync(`git tag -a ${tagName} -m "Release ${newVersion}"`, { stdio: 'inherit' });
  execSync('git push', { stdio: 'inherit' });
  execSync(`git push origin ${tagName}`, { stdio: 'inherit' });
  console.log('✅ Tag 创建并推送成功\n');
} catch {
  console.error('❌ 错误：推送 tag 失败');
  process.exit(1);
}

console.log('✅ 发布完成！');
console.log(`\n📦 Release 正在自动创建中...`);
console.log(`🔗 查看进度: https://github.com/TiAmo-chen/chatgpt-md/actions`);
console.log(`🎉 Release 完成后: https://github.com/TiAmo-chen/chatgpt-md/releases/tag/${tagName}\n`);
