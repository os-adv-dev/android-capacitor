import fs from 'fs';
import path from 'path';

const projectRoot = path.resolve();
const capacitorBuildGradle = path.join(projectRoot, 'android', 'app', 'capacitor.build.gradle');

// Function to remove the line if it exists
const removeSmartwatchDependency = () => {
  try {
    // Read the capacitor.build.gradle file
    let gradleContent = fs.readFileSync(capacitorBuildGradle, 'utf-8');
    console.log('-- 🛠️ --->>> Initial content of capacitor.build.gradle:');
    console.log(gradleContent);

    // Check if the line exists and remove it
    const lineToRemove = "implementation project(':smartwatch')";
    if (gradleContent.includes(lineToRemove)) {
      gradleContent = gradleContent.replace(new RegExp(`\\s*${lineToRemove}\\s*`), '');
      console.log('-- 🛠️ --->>> Updated content of capacitor.build.gradle (in memory):');
      console.log(gradleContent);

      // Write the updated content back to the file
      fs.writeFileSync(capacitorBuildGradle, gradleContent, 'utf-8');
      console.log('-- 🛠️ --->>> Successfully removed smartwatch dependency line from capacitor.build.gradle');
    } else {
      console.log('-- 🛠️ --->>> Smartwatch dependency line not found, no changes made.');
    }

    // Read the file again to confirm changes
    const finalContent = fs.readFileSync(capacitorBuildGradle, 'utf-8');
    console.log('-- 🛠️ --->>> Final content of capacitor.build.gradle (after write):');
    console.log(finalContent);
  } catch (error) {
    console.error('Error updating capacitor.build.gradle:', error);
  }
};

// Run the function
removeSmartwatchDependency();