import SimpleSchema from 'simpl-schema';

const loginForm = new SimpleSchema({
  username: {
    type: String,
    min: 3,
    uniforms: {
      showInlineError: true,
      autoFocus: true,
      variant: "outlined"
    }
  },
  password: {
    type: String, 
    min: 3,
    uniforms: {
      showInlineError: true,
      variant: "outlined",
    }
  }
});

export default loginForm;
