

const Login = () => {
    return (
        <div className="w-full h-[100vh] flex items-center justify-center">
            <div className="w-96 h-96 rounded-md shadow-xl p-2">
                <h1 className="text-center text-3xl">Sign In</h1>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Username</legend>
                    <input type="text" className="input w-full" placeholder="Type here" />
                </fieldset>
                <fieldset className="fieldset mb-3">
                    <legend className="fieldset-legend">Password</legend>
                    <input type="password" className="input w-full" placeholder="Type here" />
                </fieldset>
                <button className="btn btn-primary w-full mb-4">Sign In</button>
                <label>
                    Don't have an account?
                    <a className="link link-primary"> Click here</a>
                </label>
            </div>
        </div>
    );
};

export default Login;