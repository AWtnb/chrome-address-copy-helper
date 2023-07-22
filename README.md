# FEATURES


**Add a context menu to copy Japanese address as postalcode separated with tab.**

- Full width numbers and aplhabets are coverted to half width.
- Automatically trim the first postalcode symbol U+3012 (`〒`).
- Horizontal bars between numbers are automatically converted to U+002D (`-`)
- Works only on HTTPS sites.
- It does not matter whether the address is real or not. Postalcode is splitted by regular expression.
- If postalcode is not found in selected text, nothing is copied.

![img](./demo.png)

---

Initialized with [chrome-extension-cli](https://github.com/dutiyesh/chrome-extension-cli)

