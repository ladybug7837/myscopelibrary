module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'no-empty-source': null,
    'property-no-vendor-prefix': true,
    'number-leading-zero': 'always',
    'number-no-trailing-zeros': true,
    'length-zero-no-unit': true,
    'value-list-comma-space-after': 'always',
    'declaration-colon-space-after': 'always',
    'value-list-max-empty-lines': 0,
    'max-empty-lines': null,
    'shorthand-property-no-redundant-values': true,
    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-redundant-longhand-properties': true,
    'block-closing-brace-newline-after': 'always',
    'media-feature-colon-space-after': 'always',
    'media-feature-range-operator-space-after': 'always',
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-same-name-blockless'],
        ignore: ['after-comment', 'first-nested'],
        severity: 'warning',
      },
    ],
    'custom-property-empty-line-before': [
      'always',
      {
        except: ['after-custom-property'],
        ignore: ['after-comment', 'first-nested', 'inside-single-line-block'],
        severity: 'warning',
      },
    ],
    'declaration-empty-line-before': [
      'always',
      {
        except: ['after-declaration'],
        ignore: ['after-comment', 'first-nested', 'inside-single-line-block'],
        severity: 'warning',
      },
    ],
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested'],
        severity: 'warning',
      },
    ],
    'declaration-colon-newline-after': null,
    indentation: 2,
    'no-eol-whitespace': true,
    'string-no-newline': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'function',
          'if',
          'each',
          'include',
          'mixin',
          'return',
          'else',
        ],
      },
    ],
  },
};
