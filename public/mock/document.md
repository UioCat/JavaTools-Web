
## 概述

- [官网](https://www.rust-lang.org/zh-CN/)
- [GitHub](https://github.com/rust-lang)
- [文档]()
- [仓库](https://crates.io/)

## 安装

Rust 有着以 6 星期为周期的快速版本迭代机制，因此会用 rustup 可方便管理

```bash
$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

脚本会检测操作系统，自动安装，可自定义安装，并自动配置环境变量

所有工具都安装在 `~/.cargo/bin` 目录

## 组件
- rustup：
- rustc：编译器
- Cargo：构建系统和包管理工具
- rustfmt：格式化工具
- clippy：代码检查工具

安装扩展组件：

```bash
$ rustup component add rls rust-analysis rust-src
```

### VSCode 插件
- [Rust(rls)](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust)：代码提示
- crates：可提示 `cargo.toml` 版本
- Better TOML：TOML 高亮

`tasks.json`：

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Rust Build",
            "type": "shell",
            "command":"cargo",
            "args": [
				"build"
			]
        }
    ]
}
```

`launch.json`：

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Rust",
            "type": "cppdbg",
            "request": "launch",
            "program": "${workspaceFolder}/target/debug/${workspaceFolderBasename}",
            "args": [],
            "stopAtEntry": false,
            "cwd": "${workspaceFolder}",
            "environment": [],
            "externalConsole": false,
            "MIMode": "lldb"
        }
    ]
}
```

### Vim 插件

## rustup
rustup 是 Rust 的管理工具链，用于管理不同平台下的 Rust 构建版本并使其互相兼容

### 常用命令

- `show`：显示当前工具链和设置的信息
- `update`：升级工具链和 rustup
- `check`：检查工具链更新
- `default`：设置默认工具链
- `toolchain`：更改或查询已安装工具链的信息
- `target`：更改工具链的架构
- `component`：更改工具链组件
- `override`：覆盖更改工具链的组件
- `doc`：为当前工具链打开文档
- `set`：更改 rustup 设置
- `run`
- `which`
- `man`
- `self`

## Cargo
构建系统和包管理工具

[crates.io](https://crates.io)

- `new`：创建项目
- `run`：构建、运行
- `check`：快速检查代码确保其可以编译，但并不产生可执行文件
- `build`：构建项目，`--release` 会在 `target/release` 而不是 `target/debug` 生成
- `test`：测试项目
- `doc`：构建文档
- `publish`：发布到 crates.io

### 更换源
`~/.cargo/config`

- 阿里
	```toml
	[source.crates-io]
	replace-with = "rustcc"
	[source.rustcc]
	registry = "https://code.aliyun.com/rustcc/crates.io-index"
	```
- USTC
	```toml
	registry = "https://github.com/rust-lang/crates.io-index"
	replace-with = 'ustc'
	[source.ustc]
	registry = "git://mirrors.ustc.edu.cn/crates.io-index"
	# registry = "https://mirrors.ustc.edu.cn/crates.io-index"
	```
- TUNA
	```toml
	[source.crates-io]
	replace-with = 'tuna'
	[source.tuna]
	registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"
	```

### 创建新项目
```bash
$ cargo new hello
```

会生成名为 `hello` 的新目录，包含以下文件：

```
hello
|- .git
|- .gitignore
|- Cargo.toml
|- src
  |- main.rs
```

`main.rs` 默认为 `hello world` 项目代码

### 添加依赖

```bash
$ cargo install <dependency>
```

或者在 `Cargo.toml` 的 `[dependencies]` 项添加内容，再运行 `cargo build`，将创建 `Cargo.lock` 文件，用于记录本地依赖库精确版本

## 测试
### 注解
#### `#[test]`

```rust
mod tests {
	#[test]
	fn need_to_test() {
		assert!()
	}
}
```

#### `#[should_panic]`

```rust
#[test]
#[should_panic(expected = "Must be less than or equal to 100")]
fn greater_than_100() {
	Guess::new(200);
}
```

可指定 `expect` 参数

### 断言
#### `assert!`

需要提供一个求布尔值的参数

- 如果值为 `true`，会忽略
- 如果值为 `false`，则调用 `panic!` 宏

#### `assert_eq!` / `assert_ne!`

判断两个值是否相等/不相等，且失败时，将会输出具体值

```rust
assert!(add_two(2), 4);
```

- 参数为 `left` 和 `right`，顺序并不重要
- 底层使用了 `==` 和 `!=`，即被比较值必须实现了 `PartialEq` 和 `Debug` trait，所有基本类型和大部分标准库类型都已实现

#### 自定义信息

必需参数之后的参数会传递给 `format!` 宏，可传入格式字符串和对应值，用于自定义信息

```rust
assert!(
	result.contains("Carol"),
	"Greeting did not contain name, value was `{}`", result
);
```

### 测试执行
#### 线程

Rust 默认使用线程来运行多个测试，测试不应相互依赖、不应依赖共享的环境或状态

控制线程数：

```bash
$ cargo test --- --test-threads=1
```

#### 输出

Rust 默认截获标准输出，可通过 `--nocapture` 禁用，但测试输出和执行输出是交叉的

#### 指定名称

传入测试的名称即可，将会执行 `one_handred`，多余的参数将忽略

```bash
$ cargo test one_handred
```

- 当指定测试的 **部分** 名称，任何匹配的测试都将执行
- 也可指定模块名

#### 忽略

使用 `#[ignore]` 注解

```rust
#[test]
#[ignore]
fn expensive_test() {}
```

使用 `--ignore` 运行被忽略的测试

### 组织规范
#### 单元测试

与要测试的代码共同存放在位于 `src` 的文件中，在每个文件中创建 `test` 模块，并使用 `#cfg(test)` 注明

```rust
#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
```

`#cfg(test)` 用于指明在 `cargo test` 时才编译和运行测试代码，运行 `cargo build` 时不编译

### 集成测试

目的是测试库的多个部分能否一起正常工作，需要创建 `tests` 目录，与 `src` 同级

可创建任意测试文件，cargo 会将每个文件当做单独 crate 编译

注意需使用 `use` 导入库

#### 子目录

`tests` 子目录不会被作为单独 crate 编译或作为测试结果输出

#### 二进制 crate

如果项目只包含 `src/main.rs` 而没有 `src/lib.rs`，则不可能创建集成测试，因为二进制 crate 只用于单独执行

## 发布
### 优化

- `cargo build`：默认使用 `dev` 配置，
- `cargo build --release`：启用 release 配置

可深度配置 `Cargo.toml`

`opt-level` 从 `0`~`3`，值越高优化程度越高，默认如下：

```toml
[profile.dev]
opt-level = 0

[profile.release]
opt-level = 3
```

### 文档

使用 `///` 注释代码，可书写文档

`cargo doc` 生成文档，使用 `cargo doc --open` 构建并在默认浏览器打开
