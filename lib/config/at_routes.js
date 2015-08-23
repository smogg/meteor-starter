// Routes
AccountsTemplates.configure({
    defaultLayout: 'layout',
});

AccountsTemplates.configureRoute('signIn', {name: 'signIn'});
AccountsTemplates.configureRoute('signUp', {name: 'signUp'});
AccountsTemplates.configureRoute('forgotPwd');
// AccountsTemplates.configuteRoute('changePwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('verifyEmail');