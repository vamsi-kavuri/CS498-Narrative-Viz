# CS498 Final Project - Narrative Visualization
Vamsi Kavuri (vkavuri2)

Link to view final visualization : [https://vamsi-kavuri.github.io/CS498-Narrative-Viz](https://vamsi-kavuri.github.io/CS498-Narrative-Viz/)


### Messaging. What is the message you are trying to communicate with the narrative visualization?

World Economy has four global recessions over the last 70 years, occurred in 1975, 1982, 1991 and 2009. This visualization explains how each country is fared in each recession with respect to GDP (Gross Domestic Product) per Capita, Life Expectancy, Total Reserves and % of Total Employment. In this visualization, we considered top 10 countries in the world by their GDP. User can choose a country to see how it is impacted by those 4 recessions.


### Narrative Structure. Which structure was your narrative visualization designed to follow (martini glass, interactive slide show or drop-down story)? How does your narrative visualization follow that structure? (All of these structures can include the opportunity to "drill-down" and explore. The difference is where that opportunity happens in the structure.)

The Narrative structure we followed is interactive slide show hybrid structure. In this visualization, you follow the author directed path through multiple scenes where in each scene viewer can drill down for more details. It consists of 4 scenes where each slide visualizes one of parameter mentioned above. Following is the structure
1. All scenes follow the same template by rendering into the same container which always has a width of 960px and a height of 650px
2. All buttons in the scenes are consistent with a background color of gray, changes to dark gray color upon hover. 
3. Each scene has country drop down with all top 10 countries. Viewer can choose which country he wants to view.
4. All scenes uses a country cross-filter. A change of country in one scene is reflected in other scenes as well. So that we can keep viewer from getting disoriented through transitions.
5. Drill down on each slide can be done by different ways. one way is to hover on to each bar where the details can be shown as tooltip. Another way is by using annotations. On each slide there will be annotations corresponding to each recession to highlight the year that happened.

### Visual Structure. What visual structure is used for each scene? How does it ensure the viewer can understand the data and navigate the scene? How does it highlight to urge the viewer to focus on the important parts of the data in each scene? How does it help the viewer transition to other scenes, to understand how the data connects to the data in other scenes?

Every scene uses a consistent template across all. For all scenes, X-axis represents "years" and Y-axis represents the respective data points. Selected button will have darker background so that viewer would know what visualization is currently selected. There are two ways viewer can navigate. One way is by using buttons assigned for each scene or other way can be by using previous and next buttons. "Previous" and "next" buttons to direct the viewer based on author directed path. Viewer has given ability to select the scene by clicking on the respective button. To depict the forward and backward scenarios, "Previous" button is placed on the left side and "Next" button is placed on the right side. Also, arrows were added for visual representation of the buttons.

At the top and center of each scene, there is a country drop down where it shows the top 10 countries in the world by GDP and title of the chart. Upon changing the country drop down, visualization changes across all the scenes. It acts as a cross filter. 

Each scene shows a single chart with a title based on the scene selected. For example, if viewer selects "GDP per Capita" title of the chart changes to "Gross Domestic Product Per Capita (in US$)" and shows a bar chart that shows the history of GDP per each year for the selected country. If the viewer changes the country, chart will be re-rendered based on the selected countries data. Selected country remains same even if the viewer moves to different scene.

Added a label for the Y-axis to show the viewer. This label changes when the viewer changes the country.

Important parts of the scene is to find the years where the recession occurred. To get viewers attention, Added annotations with an arrow mark pointing to the years when recession occurred. Annotations are added in all scenes.

Previous and Next buttons help the user to transition to other scenes. When the Viewer clicks on the Next, they are moving to next scene in the same order buttons were places. Previous also works the same way in backward direction. If the viewer wants to choose specific scene, they can select the button.


### Scenes. What are the scenes of your narrative visualization? How are the scenes ordered, and why

- First scene shows how GDP of the country plotted for each year with annotation pointing to years when the recession occurred
  - X-axis: Years (1960-2019)
  - Y-axis: GDP per Capita (Range varies based on country selected)
  - Type: Bar chart
- Second scene shows total reserves of each country plotted for each year with annotation pointing to years when the recession occurred
  - X-axis: Years (1960-2019)
  - Y-axis: Total reserves (Range varies based on country selected)
  - Type: Bar chart
- Third scene shows life expectancy in each country plotted for each year with annotation pointing to years when the recession occurred
  - X-axis: Years (1960-2019)
  - Y-axis: Total reserves (Range varies based on country selected)
  - Type: Bar chart
- Fourth scene shows % of total employment in each country plotted for each year with annotation pointing to years when the recession occurred
  - X-axis: Years (1992-2019)
  - Y-axis: Total reserves (Range varies based on country selected)
  - Type: Bar chart

For all scenes, X-axis represents years. Range will be calculated dynamically based on the data. For example, GDP per capita dataset contains data from 1960 to 2019 for USA. so X-axis shows for all those years. whereas % total employment data contains only data from 1992 to 2019. In this case, X-axis shows only from 1992 to 2019.
Y-axis represents the respective data points. For the first scene, it is GDP per Capita. Range will be determined dynamically based on the data.

Scenes are ordered from most effected to least effected. During recession, every country GDP is mostly affected. So, I put that in the first. It followed by Total reserves, Life Expectancy  and % total employment. 

### Annotations. What template was followed for the annotations, and why that template? How are the annotations used to support the messaging? Do the annotations change within a single scene, and if so, how and why

There are two types of annotations added into this visualization. The first type is on chart where we show arrows and a text corresponding to each recession occurued in the last 7 decades. Regarding the messaging, this annotation helps the viewer to focus on the specific years and help them understand the impact by looking at the bars next to pointed ones. If the pointed bar higher than the previous bar, then that recession was positively impacted. If the pointed bar is lower than the previous bar then that recession was negatively impacted.

The second type of annotation is on the Y-axis. Regarding the messaging, this annotation provides context to the viewer. This one changes dynamically based on the country selection. For example, if the selected country is USA in GDP per Capita scene then the label shows "USA Gross Domestic Product Per Capita (in US$)". when the user changes the country to India then the label shows "IND Gross Domestic Product Per Capita (in US$)". 

Regarding the consistency of the annotations, similar markers with arrows are added to the DOM. 
Used the same markers to add annotation for each recession at the top of the bar. This is same for all scenes.

### Parameters. What are the parameters of the narrative visualization? What are the states of the narrative visualization? How are the parameters used to define the state and each scene?

##### Following are the parameters used in the visualization.

1. Country code drop down. It acts as a cross filter. Based on the country selected, respective data will be filtered and chart will be rendered. 
2. Each scene has unique code ("GDP", "LifeExp", "emp", "reserves") which is used for Navigation and chart rendering internally
3. Title of the chart changes based on the scene code
4. A CSS class is added to buttons based in the button/scene selection
5. Y-axis label changes dynamically based on country selection
6. Annotations are declared in a array passed to all scenes 

##### State changes: 

1. The state of each scene changes when the viewer change the country. On change of the country, all elements in the SVG will be removed and re-added with new data.
2. Another way to change state is to click on the buttons. On click of each button, current visualization will be cleared and new visualization will be rendered.
3. Title of the chart changes based on the selected scene 

Project starts with overview page. That page has the quick overview of the project and a link to start the visualization journey. 

##### Parameter usage: 

1. I use a select drop down to list all countries names. onchange event assigned to the select box to clear the chart and render the respective country data
2. To keep the selected country in scene across all other scenes, used a hidden filed to store the selected country
3. Scene codes are used in a switch statement to render the respective scene
4. Annotations are stored in separate array

### Triggers. What are the triggers that connect user actions to changes of state in the narrative visualization? What affordances are provided to the user to communicate to them what options are available to them in the narrative visualization?

1. Click event on the scene buttons takes the scene code ("GDP", "LifeExp", "emp", "reserves") and renders the respective scene. 
2. Change of country clears the current chart and renders updated chart using new data. 
3. Click on Previous and next buttons make the navigation move to next scenes and previous scenes in the order ("GDP", "Total Reserves", "Life Expectancy", "% of total employment")

Buttons are colored light gray with borders initially, on hover color changes to dark one to indicate it can be clicked. On click, dark background on the button remains until another button is selected. This way viewer knows where they are currently.

On change of country in each scene, Y-axis label will be updated to match with selected country. 

Previous and next buttons have arrows showing that they can be used to move forward and backward.  
