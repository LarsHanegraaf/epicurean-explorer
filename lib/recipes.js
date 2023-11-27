import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { type } from 'os'

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const recipesDirectory = path.join(process.cwd(), 'recipes')

async function getRecipesFromDb() {
    const allRecipes = await prisma.recipe.findMany()
    console.log(typeof allRecipes)
    console.log(allRecipes)
    return allRecipes
}


export function getSortedRecipesData() {
    const allRecipesData = getRecipesFromDb()
    return allRecipesData.sort((a, b) => {
        if (a.id < b.id) {
            return 1
        }
        else {
            return -1
        }
    })
}

export function getAllRecipeIds() {
    const allRecipesData = getRecipesFromDb()
    return allRecipesData.map(recipe => {
        return {
            params: {
                id: recipe.id
            }
        }
    })
  }
  
  export async function getRecipeData(id) {
    const fullPath = path.join(recipesDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();
  
    // Combine the data with the id
    return {
      id,
      contentHtml,
      ...matterResult.data,
    };
  }