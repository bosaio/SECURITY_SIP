module.exports = [
"[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/sandbox/SECURITY_SIP/client/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "build/chunks/252f0_d89a4451._.js",
  "build/chunks/[root-of-the-server]__035fbe29._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/sandbox/SECURITY_SIP/client/postcss.config.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript)");
    });
});
}),
];