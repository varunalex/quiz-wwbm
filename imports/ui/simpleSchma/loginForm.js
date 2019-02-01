import SimpleSchema from 'simpl-schema';

const loginForm = new SimpleSchema({
  username: {
    type: String,
    min: 3,
    uniforms: {
      showInlineError: true,
      autoFocus: true,
    }
  },
  password: {
    type: String, 
    min: 3,
    uniforms: {
      showInlineError: true,
    }
  }
});

export default loginForm;
