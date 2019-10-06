module.exports = {
	'env': {
		'browser': true,
		'es6': true
	},
	'extends': 'eslint:recommended',
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parserOptions': {
		'ecmaVersion': 2018,
		'sourceType': 'module'
	},
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'strict': 'error', // com strict mode
		'spaced-comment': ['error', 'always'], // espaço depois de comentário
		'space-before-blocks': ['error', 'always'], // espaço antes de bloco de código
		'indent': ['error', 'tab'], // identação por tabulação
		'no-tabs': 0, // com tabulação
		'curly': 'off', // if de um comando pode não ter chaves
		'no-mixed-operators': 'off' // desabilita bloqueio de uso de operações com '&&' e '||' misturados sem parêteses
	}
};