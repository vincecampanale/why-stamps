# why-stamps

To run locally:

1) Fork and clone this repo.  

2) Open terminal.  

3) Install Babel & Stampit.  
`npm install -g stampit`  

`npm install -g babel`  
`npm install -g babel-cli`  

4) Add the following to your .babelrc file:  

```
{
  "presets": ["es2015"]
}
```

5) `cd` into this directory and run `babel-node` to run an example on your machine.  

Example: `babel-node car-example.js`  
