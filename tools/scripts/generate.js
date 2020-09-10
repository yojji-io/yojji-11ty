const fs = require('fs').promises
const faker = require('faker')


Array.from({length: 10}, () => {
  const title = faker.random.words(3)
  const data = `---
title: ${title}
date: "2019-10-${faker.random.number({min: 10, max: 30})}"
description: "${faker.lorem.sentence(10, 15)}"
tags:
  - ${faker.random.words(2).split(' ').join('-')}
  - ${faker.random.words(2).split(' ').join('-')}
author: ${faker.name.firstName()} ${faker.name.lastName()}
cover: ${faker.random.image()}
---
${faker.lorem.paragraphs(7)}
<img src="${faker.image.imageUrl()}" width="600"/>
${faker.lorem.paragraphs(7)}
`
  fs.writeFile(`./src/ru/posts/${title.toLowerCase().replace(/ /g, '-')}.md`, data).catch(console.log)
})
