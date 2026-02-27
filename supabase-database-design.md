# Supabase 后端数据库设计方案

## 1. 项目配置

### 1.1 创建 Supabase 项目
1. 访问 [Supabase 控制台](https://app.supabase.com/)
2. 点击 "New Project"
3. 填写项目名称（如 "machine-learning-course"）
4. 选择合适的区域
5. 设置数据库密码
6. 点击 "Create Project"

### 1.2 获取项目配置
创建项目后，在项目设置中获取：
- **Project URL**: 用于连接数据库
- **Anon Key**: 用于前端API调用

### 1.3 配置前端代码
编辑 `js/main.js` 文件，将占位符替换为实际的项目配置：

```javascript
// 初始化Supabase客户端
const supabaseUrl = 'https://your-project-url.supabase.co'; // 替换为实际的Project URL
const supabaseKey = 'your-anon-key'; // 替换为实际的Anon Key
const { createClient } = supabase;
const supabase = createClient(supabaseUrl, supabaseKey);
```

## 2. 数据库表结构设计

### 2.1 课程评价表 (reviews)

| 字段名 | 数据类型 | 约束 | 描述 |
|-------|---------|------|------|
| id | uuid | PRIMARY KEY DEFAULT gen_random_uuid() | 评价ID |
| reviewer_name | text | NOT NULL | 评价者姓名 |
| rating | integer | NOT NULL CHECK (rating >= 1 AND rating <= 5) | 评分（1-5星） |
| content | text | NOT NULL | 评价内容 |
| created_at | timestamp | DEFAULT now() | 创建时间 |

### 2.2 师生互动话题表 (topics)

| 字段名 | 数据类型 | 约束 | 描述 |
|-------|---------|------|------|
| id | uuid | PRIMARY KEY DEFAULT gen_random_uuid() | 话题ID |
| title | text | NOT NULL | 话题标题 |
| content | text | NOT NULL | 话题内容 |
| author | text | NOT NULL | 发布者姓名 |
| created_at | timestamp | DEFAULT now() | 创建时间 |

### 2.3 作业表 (homeworks)

| 字段名 | 数据类型 | 约束 | 描述 |
|-------|---------|------|------|
| id | uuid | PRIMARY KEY DEFAULT gen_random_uuid() | 作业ID |
| title | text | NOT NULL | 作业标题 |
| description | text | NOT NULL | 作业描述 |
| deadline | timestamp | NOT NULL | 截止日期 |
| submitted | boolean | DEFAULT false | 是否提交 |
| submission_url | text | | 提交文件URL |
| submitted_at | timestamp | | 提交时间 |
| score | integer | | 得分 |
| comment | text | | 作业说明 |
| created_at | timestamp | DEFAULT now() | 创建时间 |

## 3. 在 Supabase 控制台创建表

### 3.1 创建 reviews 表
1. 登录 Supabase 控制台
2. 进入 "Database" 标签页
3. 点击 "New Table"
4. 填写表名：`reviews`
5. 添加字段：
   - id: UUID, Primary Key, Default: gen_random_uuid()
   - reviewer_name: Text, Not Null
   - rating: Integer, Not Null, Check: rating >= 1 AND rating <= 5
   - content: Text, Not Null
   - created_at: Timestamp, Default: now()
6. 点击 "Save"

### 3.2 创建 topics 表
1. 点击 "New Table"
2. 填写表名：`topics`
3. 添加字段：
   - id: UUID, Primary Key, Default: gen_random_uuid()
   - title: Text, Not Null
   - content: Text, Not Null
   - author: Text, Not Null
   - created_at: Timestamp, Default: now()
4. 点击 "Save"

### 3.3 创建 homeworks 表
1. 点击 "New Table"
2. 填写表名：`homeworks`
3. 添加字段：
   - id: UUID, Primary Key, Default: gen_random_uuid()
   - title: Text, Not Null
   - description: Text, Not Null
   - deadline: Timestamp, Not Null
   - submitted: Boolean, Default: false
   - submission_url: Text
   - submitted_at: Timestamp
   - score: Integer
   - comment: Text
   - created_at: Timestamp, Default: now()
4. 点击 "Save"

## 4. 配置存储桶

### 4.1 创建 homework-submissions 存储桶
1. 进入 "Storage" 标签页
2. 点击 "New Bucket"
3. 填写桶名：`homework-submissions`
4. 选择 "Public" 访问权限
5. 点击 "Create Bucket"

## 5. 测试后端功能

### 5.1 测试课程评价功能
1. 打开 `course-evaluation.html` 页面
2. 填写评价表单并提交
3. 检查 Supabase 控制台中的 `reviews` 表是否有新数据
4. 刷新页面，查看评价是否显示在列表中

### 5.2 测试师生互动功能
1. 打开 `teacher-student-interaction.html` 页面
2. 填写话题表单并提交
3. 检查 Supabase 控制台中的 `topics` 表是否有新数据
4. 刷新页面，查看话题是否显示在列表中

### 5.3 测试作业提交功能
1. 打开 `homework-submission.html` 页面
2. 选择作业并上传文件
3. 检查 Supabase 控制台中的 `homeworks` 表是否有新数据
4. 检查 `homework-submissions` 存储桶是否有上传的文件
5. 刷新页面，查看作业状态是否更新

## 6. 安全配置

### 6.1 配置 Row Level Security (RLS)
为了保护数据安全，建议为每个表启用 RLS 并设置适当的访问策略：

1. 进入 "Database" 标签页
2. 选择要配置的表
3. 点击 "Row Level Security" 标签
4. 启用 RLS
5. 添加适当的访问策略，例如：
   - 允许所有用户查看数据
   - 只允许用户修改自己的数据

### 6.2 配置 API 密钥权限
确保使用的 Anon Key 具有适当的权限，只允许必要的操作。

## 7. 故障排除

### 7.1 常见错误及解决方案
- **连接错误**：检查 supabaseUrl 和 supabaseKey 是否正确
- **权限错误**：检查 RLS 配置和 API 密钥权限
- **存储错误**：检查存储桶是否创建且权限正确
- **数据验证错误**：检查表单数据是否符合表结构要求

### 7.2 调试技巧
- 使用浏览器控制台查看错误信息
- 检查 Supabase 控制台中的日志
- 使用 Supabase CLI 进行本地开发和测试

## 8. 扩展功能

### 8.1 可能的扩展
- 添加用户认证系统，关联评价和话题到具体用户
- 添加评论系统，允许用户回复话题
- 添加作业评分和反馈功能
- 添加课程资源管理功能
- 添加实时通知功能

### 8.2 性能优化
- 为频繁查询的字段创建索引
- 使用缓存减少数据库查询
- 优化文件上传和下载流程
- 实现分页加载大量数据

## 9. 总结

本设计方案提供了一个完整的 Supabase 后端数据库实现，包括：
- 三个核心数据表的结构设计
- 存储桶配置用于文件上传
- 详细的创建和配置步骤
- 测试和故障排除指南
- 扩展和优化建议

通过按照本方案实施，可以实现一个功能完整、安全可靠的机器学习课程网站后端系统。