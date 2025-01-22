import  PrintTask from '@arcgis/core/tasks/PrintTask';
import PrintTemplate from '@arcgis/core/tasks/support/PrintTemplate';
import PrintParameters from '@arcgis/core/tasks/support/PrintParameters';

export const executePrintTask = async (
  view,
  dpi = 300,
  layout = 'A4 Landscape'
) => {
  try {
    if (!view || typeof view !== 'object') {
      throw new Error('Invalid view: Ensure a valid MapView or SceneView instance is passed.');
    }

    const printTask = new PrintTask({
      url: `https://infomapapp.com/ksaarcgis/rest/services/HealthcarePrintTool/GPServer/Export%20Web%20Map`,
    });

    const template = new PrintTemplate({
      format: 'JPG', 
      exportOptions: { dpi }, 
      layout,
    });

    const params = new PrintParameters({
      view, 
      template, 
    });

    const response = await printTask.execute(params);
    
    return response.url;
  } catch (error) {
    console.error('Error executing print task:', error);
    throw error; 
  }
};
