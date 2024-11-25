import { stripIndent } from "common-tags"
import { testRule } from "stylelint-test-rule-node"

import plugins from "../../index.js"
import { messages, ruleName } from "./index.js"

testRule({
	plugins,
	ruleName,
	config: [`tab`],
	customSyntax: `postcss-html`,
	fix: true,

	accept: [
		{
			code: stripIndent(`
				<style>
					a {
						display:block;
					}
				</style>
			`),
		},
		{
			code: stripIndent(`
				<style>
				a {
					display:block;
				}
				</style>
			`),
		},
		{
			code: stripIndent(`
				<style>a {
					display:block;
				}
				</style>
			`),
		},
		{
			code: `<a style="display:block; color:red;"></a>`,
		},
	],

	reject: [
		{
			code: stripIndent(`
				<style>
					a {
					display:block;
					}
				</style>
			`),
			fixed: stripIndent(`
				<style>
					a {
						display:block;
					}
				</style>
			`),
			message: messages.expected(`2 tabs`),
			line: 4,
			column: 2,
		},
		{
			code: stripIndent(`
				<style>
				a {
				display:block;
				}
				</style>
			`),
			fixed: stripIndent(`
				<style>
					a {
						display:block;
					}
				</style>
			`),
			warnings: [
				{
					message: messages.expected(`1 tab`),
					line: 3,
					column: 3,
				},
				{
					message: messages.expected(`1 tab`),
					line: 5,
					column: 5,
				},
				{
					message: messages.expected(`2 tabs`),
					line: 4,
					column: 7,
				},
			],
		},
		{
			code: stripIndent(`
				<style>
				a {
				display:block;
				}
				</style>
			`),
			fixed: stripIndent(`
				<style>
				a {
					display:block;
				}
				</style>
			`),
			message: messages.expected(`1 tab`),
			line: 4,
			column: 1,
		},
		{
			code: stripIndent(`
				<style>
				  a {
				  display:block;
				  }
				</style>
			`),
			fixed: stripIndent(`
				<style>
					a {
						display:block;
					}
				</style>
			`),
			warnings: [
				{
					message: messages.expected(`1 tab`),
					line: 3,
					column: 3,
				},
				{
					message: messages.expected(`1 tab`),
					line: 5,
					column: 3,
				},
				{
					message: messages.expected(`2 tabs`),
					line: 4,
					column: 3,
				},
			],
		},
		{
			code: stripIndent(`
					<style>
				    a {
					display:block;
				    }
				    b {
				      display:block;
				    }
					</style>
			`),

			fixed: stripIndent(`
					<style>
					a {
						display:block;
					}
					b {
						display:block;
					}
					</style>
			`),
			warnings: [
				{
					message: messages.expected(`1 tab`),
					line: 3,
					column: 5,
				},
				{
					message: messages.expected(`1 tab`),
					line: 5,
					column: 5,
				},
				{
					message: messages.expected(`2 tabs`),
					line: 4,
					column: 9,
				},
				{
					message: messages.expected(`1 tab`),
					line: 6,
					column: 5,
				},
				{
					message: messages.expected(`1 tab`),
					line: 8,
					column: 5,
				},
				{
					message: messages.expected(`2 tabs`),
					line: 7,
					column: 7,
				},
			],
		},
	],
})

testRule({
	plugins,
	ruleName,
	config: [2],
	customSyntax: `postcss-html`,
	fix: true,

	accept: [
		{
			code: stripIndent(`
				<style>
				  a {
				    display:block;
				  }
				</style>
			`),
		},
		{
			code: stripIndent(`
				<style>
				a {
				  display:block;
				}
				</style>
			`),
		},
		{
			code: stripIndent(`
				<style>a {
				  display:block;
				}
				</style>
			`),
		},
	],
	reject: [
		{
			code: stripIndent(`
				<style>a {
				 display:block;
				}
				</style>
			`),
			fixed: stripIndent(`
				<style>a {
				  display:block;
				}
				</style>
			`),
			message: messages.expected(`2 spaces`),
			line: 3,
			column: 2,
		},
	],
})

testRule({
	plugins,
	ruleName,
	config: [
		`tab`,
		{
			baseIndentLevel: 1,
		},
	],
	customSyntax: `postcss-html`,
	fix: true,

	accept: [
		{
			code: stripIndent(`
				<style>
					a {
						display:block;
					}
				</style>
			`),
		},
		{
			code: stripIndent(`
					<style>
						a {
							display:block;
						}
					</style>
			`),
		},
		{
			code: stripIndent(`
				<style lang="less" nonce="1">
					a {
						display:block;
					}
				</style>
			`),
		},
		{
			code: stripIndent(`
				<style
					lang="less"
					nonce="1">
					a {
						display:block;
					}
				</style>
			`),
		},
		{
			code: stripIndent(`
				<style
						lang="less"
						nonce="1"
				>
					a {
						display:block;
					}
				</style>
			`),
		},
		{
			code: stripIndent(`
					<style
						lang="less"
						nonce="1"
					>
						a {
							display:block;
						}
				</style>
			`),
		},
		{
			code: stripIndent(`
				<style
					lang="less"
						nonce="1">
					a {
						display:block;
					}
				</style>
			`),
		},
	],
	reject: [
		{
			code: stripIndent(`
				<style>
				a {
					display:block;
				}
				</style>
			`),
			fixed: stripIndent(`
				<style>
					a {
						display:block;
					}
				</style>
			`),
			warnings: [
				{
					message: messages.expected(`1 tab`),
					line: 3,
					column: 1,
				},
				{
					message: messages.expected(`1 tab`),
					line: 5,
					column: 1,
				},
				{
					message: messages.expected(`2 tabs`),
					line: 4,
					column: 2,
				},
			],
		},
		{
			code: stripIndent(`
					<style>
					a {
						display:block;
					}
					</style>
			`),
			fixed: stripIndent(`
					<style>
						a {
							display:block;
						}
					</style>
			`),
			warnings: [
				{
					message: messages.expected(`2 tabs`),
					line: 3,
					column: 2,
				},
				{
					message: messages.expected(`2 tabs`),
					line: 5,
					column: 2,
				},
				{
					message: messages.expected(`3 tabs`),
					line: 4,
					column: 3,
				},
			],
		},
	],
})

testRule({
	plugins,
	ruleName,
	config: [
		`tab`,
		{
			baseIndentLevel: 0,
		},
	],
	customSyntax: `postcss-html`,
	fix: true,

	accept: [
		{
			code: stripIndent(`
				<style>
				a {
					display:block;
				}
				</style>
			`),
		},
		{
			code: stripIndent(`
					<style>
					a {
						display:block;
					}
					</style>
			`),
		},
	],
	reject: [
		{
			code: stripIndent(`
				<style>
					a {
						display:block;
					}
				</style>
			`),
			fixed: stripIndent(`
				<style>
				a {
					display:block;
				}
				</style>
			`),
			warnings: [
				{
					message: messages.expected(`0 tabs`),
					line: 3,
					column: 2,
				},
				{
					message: messages.expected(`0 tabs`),
					line: 5,
					column: 2,
				},
				{
					message: messages.expected(`1 tab`),
					line: 4,
					column: 3,
				},
			],
		},
		{
			code: stripIndent(`
					<style>
						a {
							display:block;
						}
					</style>
			`),
			fixed: stripIndent(`
					<style>
					a {
						display:block;
					}
					</style>
			`),
			warnings: [
				{
					message: messages.expected(`1 tab`),
					line: 3,
					column: 3,
				},
				{
					message: messages.expected(`1 tab`),
					line: 5,
					column: 3,
				},
				{
					message: messages.expected(`2 tabs`),
					line: 4,
					column: 4,
				},
			],
		},
	],
})

testRule({
	plugins,
	ruleName,
	config: [
		2,
		{
			baseIndentLevel: 1,
		},
	],
	customSyntax: `postcss-html`,
	fix: true,

	accept: [
		{
			code: stripIndent(`
				<style>
				  a {
				    display:block;
				  }
				</style>
			`),
		},
		{
			code: stripIndent(`
				  <style>
				    a {
				      display:block;
				    }
				  </style>
			`),
		},
		{
			code: stripIndent(`
				<style lang="less" nonce="1">
				  a {
				    display:block;
				  }
				</style>
			`),
		},
		{
			code: stripIndent(`
				<style
				  lang="less"
				  nonce="1">
				  a {
				    display:block;
				  }
				</style>
			`),
		},
		{
			code: stripIndent(`
				<style
				    lang="less"
				    nonce="1"
				>
				  a {
				    display:block;
				  }
				</style>
			`),
		},
		{
			code: stripIndent(`
				  <style
				    lang="less"
				    nonce="1"
				  >
				    a {
				      display:block;
				    }
				</style>
			`),
		},
		{
			code: stripIndent(`
				<style
				  lang="less"
				    nonce="1">
				  a {
				    display:block;
				  }
				</style>
			`),
		},
	],
	reject: [
		{
			code: stripIndent(`
				<style>
				a {
				  display:block;
				}
				</style>
			`),
			fixed: stripIndent(`
				<style>
				  a {
				    display:block;
				  }
				</style>
			`),
			warnings: [
				{
					message: messages.expected(`2 spaces`),
					line: 3,
					column: 1,
				},
				{
					message: messages.expected(`2 spaces`),
					line: 5,
					column: 1,
				},
				{
					message: messages.expected(`4 spaces`),
					line: 4,
					column: 3,
				},
			],
		},
		{
			code: stripIndent(`
				  <style
				    lang="less">
				      a {
					display:block;
				      }
				  </style>
			`),
			fixed: stripIndent(`
				  <style
				    lang="less">
				    a {
				      display:block;
				    }
				  </style>
			`),
			warnings: [
				{
					message: messages.expected(`4 spaces`),
					line: 4,
					column: 7,
				},
				{
					message: messages.expected(`4 spaces`),
					line: 6,
					column: 7,
				},
				{
					message: messages.expected(`6 spaces`),
					line: 5,
					column: 9,
				},
			],
		},
	],
})
testRule({
	plugins,
	ruleName,
	config: [
		2,
		{
			baseIndentLevel: 1,
		},
	],
	customSyntax: `postcss-html`,
	fix: true,

	accept: [
		{
			code: stripIndent(`
				<html>
				  <head>
				    <style>
				      a {
					display: block;
				      }
				    </style>
				  </head>
				</html>
			`),
		},
		{
			code: stripIndent(`
				<div>
				  <style>
				    a {
				      color: pink;
				    }
				  </style>
				</div>
			`),
		},
	],

	reject: [
		{
			code: stripIndent(`
				<html>
				  <head>
				    <style>
				    a {
					display: block;
				      }
				    </style>
				  </head>
				</html>
			`),
			fixed: stripIndent(`
				<html>
				  <head>
				    <style>
				      a {
					display: block;
				      }
				    </style>
				  </head>
				</html>
			`),
			message: messages.expected(`6 spaces`),
			line: 4,
			column: 5,
		},
		{
			code: stripIndent(`
				<div>
				  <style>
				a {
				      color: pink;
				    }
				  </style>
				</div>
			`),
			fixed: stripIndent(`
				<div>
				  <style>
				    a {
				      color: pink;
				    }
				  </style>
				</div>
			`),
			message: messages.expected(`4 spaces`),
			line: 3,
			column: 1,
		},
		{
			code: stripIndent(`
				<div>
				  <style>
				    a {
				  color: pink;
				    }
				  </style>
				</div>
			`),
			fixed: stripIndent(`
				<div>
				  <style>
				    a {
				      color: pink;
				    }
				  </style>
				</div>
			`),
			message: messages.expected(`6 spaces`),
			line: 4,
			column: 3,
		},
		{
			code: stripIndent(`
				<div>
				  <style>
				    a {
				      color: pink;
					}
				  </style>
				</div>
			`),
			fixed: stripIndent(`
				<div>
				  <style>
				    a {
				      color: pink;
				    }
				  </style>
				</div>
			`),
			message: messages.expected(`4 spaces`),
			line: 5,
			column: 15,
		},
	],
})
