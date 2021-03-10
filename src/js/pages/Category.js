import slugify from '../utils/slugify';
import appendVideoToGallery from '../utils/appendVideoToGallery';

/**
 * Finds category name by slug (reverse lookup).
 *
 * @todo Later on if we introduce Categories endpoint that will be changed.
 *
 * @param {string} slug Slug.
 * @param {object[]} videoDataArray Array of video metadata objects.
 *
 * @returns {string} Category name or empty string.
 */
function findCategoryNameBySlug(slug, videoDataArray) {
  for (let i = 0; i < videoDataArray.length; i += 1) {
    for (let j = 0; j < videoDataArray[i].categories.length; j += 1) {
      const cat = videoDataArray[i].categories[j];
      if (slugify(cat) === slug) {
        return cat;
      }
    }
  }
  return '';
}

export default ({
  mainContent, videoDataArray, path, navigate,
}) => {
  const categorySlug = path.replace('/category/', '');
  const categoryName = findCategoryNameBySlug(categorySlug, videoDataArray);
  mainContent.innerHTML = `
    <div class="page-title">
        <h2>${categoryName}</h2>
        <img src="/images/arrow-down.svg" alt="" />
    </div>
    <div class="category"></div>
  `;
  const content = mainContent.querySelector('.category');
  const filteredVideoDataArray = videoDataArray.filter(
    (videoData) => videoData.categories.includes(categoryName),
  );
  appendVideoToGallery(filteredVideoDataArray, navigate, '', content);
};
