## Webpage Link

https://6859-sp21.github.io/a4-citibiketrips/

# Introduction

Like the BlueBikes system on the Boston and Cambridge, New York City also has a bikes-for-rent service to help its citizens navigate within and around the city. The infrastructure is sponsored by Citi bank, and thus their service is named Citibikes.

The service produces a lot of valuable data about how the citizens move around. Specifically, the origin, destination, time of day, and ride duration are all quite valuable. Citibikes publicly provides this information at https://www.citibikenyc.com/system-data.

# Questions

I had a couple of questions that I wanted to answer with the dataset:

- Where did people go in the city with the Citibikes?
- What trends could be found based on how people traveled on Citibikes?

# Data Subsampling

Due to the size of the dataset (for 2020 alone, it was 1.5 GB), I decided to focus on the Jersey City region, next to NYC.

# Encodings and Markings

Given the geographical nature of the dataset, I thought it would be best to convey the data on a map. To facilitate exploration of the data, I implemented a couple of markings and interaction methods. First, the data for each station is represented in a 3D histogram, and their locations are placed on the map. The height of the histogram represents the net change in the number of bikes at that station over the given time period. Color is then used to encode whether that station had a net gain or net loss in the number of bikes.

To see where people traveled between, the next interaction implemented allows for a user to hover over a station to see people's destinations, and it also shows the distribution of destinations given a particlar source station. THe net flow is once again encoded with color.

Finally, to see how people might use Citibikes throughout the day, a sliding filter was implemented that filter trips based on the time of day. Users interacting with the visualization can adjust the filter as a sliding window, or unlock the filter size to freely adjust the filter.

To orient the viewer, the percentage of all trips in the dataset that the time filter covers is indicated in a legend. A button to reset the time filter was implemented by request of suggestions from the MVP. A help button was also included with directions about how to interact with the visualization.

# Development Process (MVP)

The project took a while. The initial analysis of the data was for a day or two in order to determine if the data was rich enough for a narative or interesting conclusions. The building of the interactive visualization also took about 15 hours of time: development, troubleshooting, and deployment. Overall, the most time consuming aspect was finding the best way to encode the information as concisely as possible, and working with limitations based on the size of the dataset.

# Development Process (Final)

The improvements on the MVP was mainly to focus on better user friendliness. An introduction to the dataset along with helper tooltips were added to facilitate user interaction. The initial loading of the data always took a while, so a loading indicator was included. The map also zooms in initially, to indicate to the user that the map is dynamic/can be moved. The most time consuming update from the MVP to the final was creating a preprocessed dataset so that the changes of the time filter could be reflected faster. This took most of the time (~9 hours) between the MVP and the final (total ~12 hours).
