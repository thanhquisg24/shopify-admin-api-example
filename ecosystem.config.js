module.exports = {
  apps: [
    {
      name: 'a2e-api-hook',
      script: './dist/main.js',
      env: {
        NODE_ENV: 'production',
        PASSPHRASE_ENCRYPT: 'Frg29a2d22aa2j3NGwFyB#^n#ymX',
        NTBA_FIX_319: '1',
        GAPONE_CLIENT_ID: 'EFENQcs4Utre4t0q',
        GAPONE_CLIENT_SERECT: 'KfGV-QP05_zQHhRL25RhpF6GVv1slR2G',
      },
    },
  ],
};
