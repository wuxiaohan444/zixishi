import CryptoJS from 'crypto-js';

export default {

    KEY: 'qxhzngy266a186kedfghfghjkg-fuexynimcrxwzxzd=',
    IV: '1ci5crnda6ojzgtr-=',
    LEN: 16,

    /**
     * 补全长度
     * @param {*} content 
     * @param {*} length 
     */
    completeLength(content, pLength) {
        let c = content;
        if (!pLength) {
            pLength = this.LEN;
        }
        if (c) {
            let length = c.length;
            if (length < pLength) {
                c = c.padEnd(16, '0');
            } else {
                c = c.substring(0, 16);
            }
        }
        return c;
    },

	encrypt(word) {
	    encrypt(word, null, null);
	},

    /**
     * 
     * 第一个参数word是待加密或者解密的字符串；
     * 第二个参数keyStr是aes加密需要用到的16位字符串的key；
     * 第三个参数是初始化向量 iv。
     */
    encrypt(word, keyStr, ivStr) {
        keyStr = keyStr ? keyStr : this.KEY;
        keyStr = this.completeLength(keyStr, this.LEN);
        ivStr = ivStr ? ivStr : this.IV;
        ivStr = this.completeLength(ivStr, this.LEN);
        let key = CryptoJS.enc.Utf8.parse(keyStr);
        let iv = CryptoJS.enc.Utf8.parse(ivStr);
        let srcs = CryptoJS.enc.Utf8.parse(word);
        let encrypted = CryptoJS.AES.encrypt(srcs, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    },

    /**
     * 解密
     * @param {*} word 
     * @param {*} keyStr 
     * @param {*} ivStr 
     */
    decrypt(word, keyStr, ivStr) {
      keyStr = keyStr ? keyStr : this.KEY;
      keyStr = this.completeLength(keyStr, this.LEN);
      ivStr = ivStr ? ivStr : this.IV;
      ivStr = this.completeLength(ivStr, this.LEN);
      var key = CryptoJS.enc.Utf8.parse(keyStr);
      let iv = CryptoJS.enc.Utf8.parse(ivStr);
	  
      var decrypt = CryptoJS.AES.decrypt(word, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      return decrypt.toString(CryptoJS.enc.Utf8);
    }


}