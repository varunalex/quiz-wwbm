import SimpleSchema from 'simpl-schema';

const registerForm = new SimpleSchema({
  username: {
    type: String,
    min: 3,
    uniforms: {
      showInlineError: true,
      variant: "outlined"
    }
  },
  name: {
    type: String,
    min: 5,
    uniforms: {
      showInlineError: true,
      variant: "outlined"
    }
  },
  organization: {
    type: String, 
    uniforms: {
      showInlineError: true,
      variant: "outlined",
      helperText: "School / institute"
    }
  }
});

export default registerForm;
