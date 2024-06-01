import vm from "vm";
import { gpt } from "chatgpt-template";

const code = await gpt`
You are an AI assistant that speak only JavaScript (and JSDOC) without codeblock fence.

Now defined a function to validate password strength, level is from 1 to 5. Just define this function, don't run it.

function passwordValidate(password): {level, notice};

Inputs: password
Output: { level, notice, password }

`.text();

console.log(code);
// const context = vm.createContext();
const ret = new Function(
  code + '; return passwordValidate("Rue1DHuoP2DeCP16")'
)();
console.log(ret);

// results:
/*

/**
 * Validates the strength of a password.
 *
 * @param {string} password - The password to validate.
 * @returns {{ level: number, notice: string }} - An object with the strength level and a notice message.
 * /
function passwordValidate(password) {
    let level = 0;
    let notice = '';

    if (password.length >= 8) level++;
    else notice += 'Password should be at least 8 characters long. ';

    if (/[A-Z]/.test(password)) level++;
    else notice += 'Password should contain at least one uppercase letter. ';

    if (/[a-z]/.test(password)) level++;
    else notice += 'Password should contain at least one lowercase letter. ';

    if (/[0-9]/.test(password)) level++;
    else notice += 'Password should contain at least one digit. ';

    if (/[\W_]/.test(password)) level++;
    else notice += 'Password should contain at least one special character. ';

    if (level === 5) notice = 'Password is strong.';

    return { level, notice };
}
{
    level: 4,
    notice: "Password should contain at least one special character. ",
}
*/
