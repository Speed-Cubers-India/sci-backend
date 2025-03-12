require('esbuild').build({
  entryPoints: ['src/lambda.ts'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  outfile: 'dist/lambda.js',
  external: ['aws-sdk'],
}).catch(() => process.exit(1));
