import { AppError } from "./app.error";
import { Recipe, RecipeType } from "./recipe";
import { Store } from "./stores/store.type";

export async function list(store: Store<RecipeType[]>, args: string[]) {
  if (args.length > 0) {
    throw new AppError('The list command should not have any argument')
  }
  const recipe = new Recipe(store);
  const recipes = await recipe.readAll();
  const formatted = recipes
    .map((recipe) => `- [${recipe.id}] ${recipe.name}`)
    .join('\n');
  console.log('Your recipes:');
  console.log(formatted);
}

export async function details(store: Store<RecipeType[]>, args: string[]) {
  if (args.length !== 1) {
    throw new AppError('The list command should not have any argument')
  }
  const id = parseInt(args[0])
  if (typeof id !== 'number') {
    throw new AppError('The id has to be a number')
  }
  const recipe = new Recipe(store);
  const recipes = await recipe.readAll();
  const recipeDetails = recipes.find((recipe) => recipe.id === id)

  if (!recipeDetails) {
    throw new AppError (`Recipe id ${id} not found`)
  }

  console.log(`Recipe ID: ${id}`)
  console.log(`Recipe: ${recipeDetails.name}`)
}