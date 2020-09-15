# Dzianis Shalkevich

![MyPhoto](https://avatars0.githubusercontent.com/u/12560265?s=460&u=928035af8bf49df5ec13ce5aecf3ee6976a47c64&v=4)

## My contacts:
  - **Email:** <crippton@gmail.com>
  - **LinkedIn:** [Denis Shalkevich](https://www.linkedin.com/in/denis-shalkevich-b8a090ba/)
  - **Phone:** [+375336903061](tel:+375336903061)
## About me:
>I have good self-motivation and troubleshooting skills, decisive and logical, ability for research, communicative and **open for a new experience**. I'm an excellent team-player. 

## My key skills:
|`Code:`| JavaScript, HTML, CSS, git|
---|---|
|`IDE:`| Visual Studio Code|
|`Graphic processor:` | Photoshop|

## Experience
>I have 5 years product expirince as a software engineer in tests. For now I'm working on Senior position.

## Example of my code:

```javascript
//Complete the function to return true if the two arguments given are anagrams of each other; return false otherwise.

var isAnagram = function(test, original) {
  let testLowerCase = test.toLowerCase();
  let boolen = true;
  let counter = 0;
  let originalLoverCase = original.toLowerCase();
  if(test.length === original.length){
    for ( let i = 0; i < original.length; i += 1){
      if(originalLowerCase.includes(testLowerCase[i]) === true) {
        counter = counter += 1;
      } else {
        boolen = false;
      }
      if(counter === original.length){
        boolen = true;
      }
    }
    return boolen;
  } else {
    return false;
  }
  
};
```

## English skills:
>  I think that I have **A2 level** of English language. I try to use it every day: read technical documentations, books and articles, listen podcasts, watch  movies and youtube videos. Also I got courses at [KESPA](https://kespa.ru/).