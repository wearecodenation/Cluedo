function caesar(str, num) {
    str = str.toUpperCase();
    return str.replace(/[A-Z]/g, rot);

    function rot(correspondance) {
        const charCode = correspondance.charCodeAt();
        return String.fromCharCode(
            ((charCode + num) <= 90) ? charCode + num
                : (charCode + num) % 90 + 64
        );

    }
}

function pigpen() {
    let plaintext = document.getElementById("plaintext").value;
    plaintext = plaintext.toLowerCase();
    let ciphertext = "";
    let alphabetNoDot = "abcdefghistuv";
    let alphabetDot = "jklmnopqrwxyz";

    for (let i = 0; i < plaintext.length; i++) {
        let letter = plaintext.charAt(i);
        if (alphabetNoDot.indexOf(letter) > -1) {
            ciphertext = ciphertext + "<div class='pigpen-wrapper'><div class='pigpen " + letter + "'> </div></div>";
        } else {
            if (alphabetDot.indexOf(letter) > -1) {
                ciphertext = ciphertext + "<div class='pigpen-wrapper dotted'><div class='pigpen " + letter + "'> </div></div>";
            }
        }
    }
    document.getElementById("ciphertext").innerHTML = ciphertext;
}

// /* 
//  * Vigenère cipher
//  */

"use strict";

const vigenere = new function() {
	
	// /* 
	//  * Handles the HTML input/output for Vigenère cipher encryption/decription.
	//  * This is the one and only entry point function called from the HTML code.
	//  */
	this.doCrypt = function(isDecrypt, theKey, theClue) {
		if (theKey.length == 0) {
			alert("Key is empty");
			return;
		}
		
		let keyArray = filterKey(theKey);
		if (keyArray.length == 0) {
			alert("Key has no letters");
			return;
		}
		
		if (isDecrypt) {
			for (let i = 0; i < keyArray.length; i++)
				keyArray[i] = (26 - keyArray[i]) % 26;
		}
		
		return crypt(theClue, keyArray);
	};
	
	
	// /* 
	//  * Returns the result the Vigenère encryption on the given text with the given key.
	//  */
	function crypt(input, key) {
		let output = "";
		let j = 0;
		for (const ch of input) {
			const cc = ch.codePointAt(0);
			if (isUppercase(cc)) {
				output += String.fromCodePoint((cc - 65 + key[j % key.length]) % 26 + 65);
				j++;
			} else if (isLowercase(cc)) {
				output += String.fromCodePoint((cc - 97 + key[j % key.length]) % 26 + 97);
				j++;
			} else {
				output += ch;
			}
		}
		return output;
	}
	
	
	// /* 
	//  * Returns an array of numbers, each in the range [0, 26), representing the given key.
	//  * The key is case-insensitive, and non-letters are ignored.
	//  * Examples:
	//  * - filterKey("AAA") = [0, 0, 0].
	//  * - filterKey("abc") = [0, 1, 2].
	//  * - filterKey("the $123# EHT") = [19, 7, 4, 4, 7, 19].
	//  */
	function filterKey(key) {
		let result = [];
		for (const ch of key) {
			const cc = ch.codePointAt(0);
			if (isLetter(cc))
				result.push((cc - 65) % 32);
		}
		return result;
	}
	
	// Tests whether the given character code is a Latin letter.
	function isLetter(c) {
		return isUppercase(c) || isLowercase(c);
	}
	
	// Tests whether the given character code is an Latin uppercase letter.
	function isUppercase(c) {
		return 65 <= c && c <= 90;  // 65 is character code for 'A'. 90 is 'Z'.
	}
	
	// Tests whether the given character code is a Latin lowercase letter.
	function isLowercase(c) {
		return 97 <= c && c <= 122;  // 97 is character code for 'a'. 122 is 'z'.
	}
	
};

export { caesar, pigpen, vigenere }