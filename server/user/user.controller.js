const { OAuth2Client } = require("google-auth-library");
const { UserModel } = require("./user.model");
console.log("userController triggers");
const client = new OAuth2Client(
  "152826738328-2gschac9945q44ilfue2n9c6d19nt296.apps.googleusercontent.com"
);

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience:
      "152826738328-2gschac9945q44ilfue2n9c6d19nt296.apps.googleusercontent.com",
  });
  return ticket.getPayload();
}

async function googleLogin(req, res) {
  const { token } = req.body;
  console.log("google login triggers")
  try {
    const googleUser = await verify(token);
    console.log("token trigger");
    let user;

    try {
      user = await UserModel.findOne({ email: googleUser.email });

      if (!user) {
        user = await UserModel.create({
          name: googleUser.name,
          email: googleUser.email,
          imageUrl: googleUser.picture
        });
        console.log("have not find the user, so created it!");
      }

      req.session.user = user;
    } catch (error) {
      console.log("error so login failed!", error);
      res.status(401).json({ message: "Login failed", error: error.message });

      return;
    }

    res.status(200).json({ message: "User authenticated", user });
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
}


async function googleLogout(req, res) {
  try {
    if (!req.session) {
      return res.status(401).json("Cannot logout when you are not logged in");
    }

    req.session = null;
    res.status(204).json(null);
  } catch (error) {
    res.status(401).json({ message: "Logout failed" });
  }
}

async function googleAuth(req, res) {
  if (!req.session || !req.session.user) {
    console.log("User session missed!");
    return res.status(401).json({ error: "Not authenticated" });

  }

  try {
    const user = req.session.user;
    res.status(200).json(user);
    console.log("User session exist!");
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

async function getUser(req, res) {
  try {
    const userId = req.params.id;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

module.exports = { googleLogin, googleLogout, googleAuth, getUser };
