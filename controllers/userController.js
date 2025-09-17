
exports.loginGet = (req, res) => {
    res.render('index');
}

exports.signupGet = (req, res) => {
    res.render('signup');
}

exports.errorGet = (req, res) => {
    res.render('error');
}
exports.dashboardGet = (req, res) => {
    res.render('dashboard');
}