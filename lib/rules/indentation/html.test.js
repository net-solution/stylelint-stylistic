import { testRule } from "stylelint-test-rule-node"

import plugins from "../../index.js"
import { stripIndent } from "common-tags"
import { messages, ruleName } from "./index.js"

testRule({
	plugins,
	ruleName,
	config: [`tab`],
	customSyntax: `postcss-html`,
	fix: true,

	accept: [
		{
			code: `
<style>
\ta {
\t\tdisplay:block;
\t}
</style>`,
		},
		{
			code: `
<style>
a {
\tdisplay:block;
}
</style>`,
		},
		{
			code: `
<style>a {
\tdisplay:block;
}
</style>`,
		},
		{
			code: `<a style="display:block; color:red;"></a>`,
		},
	],

	reject: [
		{
			code: `
<style>
\ta {
\tdisplay:block;
\t}
</style>`,
			fixed: `
<style>
\ta {
\t\tdisplay:block;
\t}
</style>`,
			message: messages.expected(`2 tabs`),
			line: 4,
			column: 2,
		},
		{
			code: `
<style>
  a {
      display:block;
    }
</style>`,
			fixed: `
<style>
\ta {
\t\tdisplay:block;
\t}
</style>`,
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
			code: `
<style>
a {
display:block;
}
</style>`,
			fixed: `
<style>
a {
\tdisplay:block;
}
</style>`,
			message: messages.expected(`1 tab`),
			line: 4,
			column: 1,
		},
		{
			code: `
<style>
  a {
  display:block;
  }
</style>`,
			fixed: `
<style>
\ta {
\t\tdisplay:block;
\t}
</style>`,
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
			code: `
\t<style>
    a {
        display:block;
    }
    b {
      display:block;
    }
\t</style>`,
			fixed: `
\t<style>
\ta {
\t\tdisplay:block;
\t}
\tb {
\t\tdisplay:block;
\t}
\t</style>`,
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
			code: `
<style>
  a {
    display:block;
  }
</style>`,
		},
		{
			code: `
<style>
a {
  display:block;
}
</style>`,
		},
		{
			code: `
<style>a {
  display:block;
}
</style>`,
		},
	],
	reject: [
		{
			code: `
<style>a {
 display:block;
}
</style>`,
			fixed: `
<style>a {
  display:block;
}
</style>`,
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
			code: `
<style>
\ta {
\t\tdisplay:block;
\t}
</style>`,
		},
		{
			code: `
\t<style>
\t\ta {
\t\t\tdisplay:block;
\t\t}
\t</style>`,
		},
		{
			code: `
<style lang="less" nonce="1">
\ta {
\t\tdisplay:block;
\t}
</style>`,
		},
		{
			code: `
<style
\tlang="less"
\tnonce="1">
\ta {
\t\tdisplay:block;
\t}
</style>`,
		},
		{
			code: `
<style
\t\tlang="less"
\t\tnonce="1"
>
\ta {
\t\tdisplay:block;
\t}
</style>`,
		},
		{
			code: `
\t<style
\t\tlang="less"
\t\tnonce="1"
\t>
\t\ta {
\t\t\tdisplay:block;
\t\t}
</style>`,
		},
		{
			code: `
<style
\tlang="less"
\t\tnonce="1">
\ta {
\t\tdisplay:block;
\t}
</style>`,
		},
	],
	reject: [
		{
			code: `
<style>
a {
\tdisplay:block;
}
</style>`,
			fixed: `
<style>
\ta {
\t\tdisplay:block;
\t}
</style>`,
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
			code: `
\t<style>
\ta {
\t\tdisplay:block;
\t}
\t</style>`,
			fixed: `
\t<style>
\t\ta {
\t\t\tdisplay:block;
\t\t}
\t</style>`,
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
			code: `
<style>
a {
\tdisplay:block;
}
</style>`,
		},
		{
			code: `
\t<style>
\ta {
\t\tdisplay:block;
\t}
\t</style>`,
		},
	],
	reject: [
		{
			code: `
<style>
\ta {
\t\tdisplay:block;
\t}
</style>`,
			fixed: `
<style>
a {
\tdisplay:block;
}
</style>`,
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
			code: `
\t<style>
\t\ta {
\t\t\tdisplay:block;
\t\t}
\t</style>`,
			fixed: `
\t<style>
\ta {
\t\tdisplay:block;
\t}
\t</style>`,
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
			code: `
<style>
  a {
    display:block;
  }
</style>`,
		},
		{
			code: `
  <style>
    a {
      display:block;
    }
  </style>`,
		},
		{
			code: `
<style lang="less" nonce="1">
  a {
    display:block;
  }
</style>`,
		},
		{
			code: `
<style
  lang="less"
  nonce="1">
  a {
    display:block;
  }
</style>`,
		},
		{
			code: `
<style
    lang="less"
    nonce="1"
>
  a {
    display:block;
  }
</style>`,
		},
		{
			code: `
  <style
    lang="less"
    nonce="1"
  >
    a {
      display:block;
    }
</style>`,
		},
		{
			code: `
<style
  lang="less"
    nonce="1">
  a {
    display:block;
  }
</style>`,
		},
	],
	reject: [
		{
			code: `
<style>
a {
  display:block;
}
</style>`,
			fixed: `
<style>
  a {
    display:block;
  }
</style>`,
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
			code: `
  <style
    lang="less">
      a {
        display:block;
      }
  </style>`,
			fixed: `
  <style
    lang="less">
    a {
      display:block;
    }
  </style>`,
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
			warnings: [
				{
					message: messages.expected(`6 spaces`),
					line: 4,
					column: 5,
				},
				{
					message: messages.expected(`8 spaces`),
					line: 5,
					column: 2,
				},
			],
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
			warnings: [
				{
					message: messages.expected(`4 spaces`),
					line: 3,
					column: 1,
				},
				{
					message: messages.expected(`4 spaces`),
					line: 5,
					column: 2,
				},
				{
					message: messages.expected(`6 spaces`),
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
			warnings: [
				{
					message: messages.expected(`3 tabs`),
					line: 4,
					column: 3,
				},
				{
					message: messages.expected(`3 tabs`),
					line: 6,
					column: 7,
				},
				{
					message: messages.expected(`4 tabs`),
					line: 5,
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
			baseIndentLevel: 3,
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
				<style>
							a {
								color: pink;
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
				color: pink;
				}
				</style>
			`),
			fixed: stripIndent(`
				<style>
							a {
								color: pink;
							}
				</style>
			`),
			warnings: [
				{
					message: messages.expected(`3 tabs`),
					line: 2,
					column: 1,
				},
				{
					message: messages.expected(`3 tabs`),
					line: 4,
					column: 1,
				},
				{
					message: messages.expected(`4 tabs`),
					line: 3,
					column: 1,
				},
			],
		},
	],
})
