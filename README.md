# sentiment-analysis-web

**Live Demo here:** [https://alextobias.me/sentiment-analysis-web/predict-sentiment.html](http://alextobias.me/sentiment-analysis-web/predict-sentiment.html)

This is a basic demo of using [fasttext's](https://fasttext.cc/) webassembly module to peform sentiment analysis. All work is done in the browser with webassembly, no requests to any external sentiment analysis API are made. 

## Model notes
- The model is trained on the [Sentiment140](https://www.kaggle.com/kazanova/sentiment140) tweet sentiment dataset.
- By using [automatic hyperparameter optimization](https://fasttext.cc/docs/en/autotune.html), I was able to shrink the 1.6 million tweet model from 250MB to just 2MB, which is why it's actually possible to load it here.
- It's still by no means perfect; and I'm looking into ways to both optimize for size and improve accuracy.

## Issues I had to troubleshoot with fasttext webassembly (may help if you're trying to do something similar)
- If you're trying to do this yourself, I found these notes helpful to set up and build the webassembly binaries. (I'm on ubuntu 18.04)

### Issue 1 - fasttext wasm compilation error after installing emscripten
When trying to compile fasttext wasm, I ran into issues with my version of emscripten; fixed by installing emscripten version 2.0.3 instead.

See https://github.com/facebookresearch/fastText/issues/1166

### Issue 2 - fasttext 'addOnPostRun' error after compilation

After I was able to build the fasttext wasm files (`fasttext_wasm.wasm`, `fasttext_wasm.js`, `fasttext.js`), I got this error after trying to the http server demo:

`TypeError: fastTextModule.addOnPostRun is not a function`

I was able to fix this by integrating these changes:

https://github.com/facebookresearch/fastText/issues/1173 (initial discovery link)

https://github.com/facebookresearch/fastText/pull/1116 (see 'changed files' for what needed to change)

