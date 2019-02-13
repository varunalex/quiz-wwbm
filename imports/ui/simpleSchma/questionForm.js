import SimpleSchema from 'simpl-schema';

const questionForm = new SimpleSchema({
  question: {
    type: String,
    min: 3,
    uniforms: {
      showInlineError: true,
      autoFocus: true,
      variant: "outlined",
      multiline: true,
      rowsMax: 4,
    }
  },
  answers: {
    type: Array,
    minCount: 4,
    maxCount: 4,
    uniforms: {
      showInlineError: true,
    }
  },
  'answers.$': {
    type: String,
    uniforms: {
      showInlineError: true,
      variant: "outlined",
    }
  },
  correct: {
    type: Number,
    uniforms: {
      showInlineError: true,
      variant: "outlined",
    }
  },
  level: {
    type: String,
    allowedValues: ['L1', 'L2', 'L3'],
    defaultValue: 'L1',
    uniforms: {
      showInlineError: true,
      variant: "outlined",
    }
  },
  lang: {
    type: String,
    allowedValues: ['Si', 'En'],
    defaultValue: 'Si',
    uniforms: {
      showInlineError: true,
      variant: "outlined",
    }
  },
  extra: {
    type: String,
    required: false,
    uniforms: {
      showInlineError: true,
      variant: "outlined",
      multiline: true,
      rowsMax: 4,
    }
  },
});

export default questionForm;