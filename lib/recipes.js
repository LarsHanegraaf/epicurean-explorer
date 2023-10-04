import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const recipesDirectory = path.join(process.cwd(), 'recipes')

export function getSortedRecipesData() {
    const fileNames = fs.readdirSync(recipesDirectory)
    const allRecipesData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '')
        const fullPath = path.join(recipesDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const matterResult = matter(fileContents)
        return {
            id,
            ...matterResult.data
        }
    });
    return allRecipesData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        }
        else {
            return -1
        }
    })
}