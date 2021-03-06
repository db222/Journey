var SimilarPeopleModel = Backbone.Model.extend({
    
    url: 'api/profiles/getProfilesFromIndustry',

    initialize : function (industryname) {
        //fetch data from the server

        this.fetch( { data : $.param( { 'industryName' : industryname } ) } );
    },

    parse : function(data) {
        
        this.set('similarPeople', data.slice(0, 10));
        this.trigger('similarPeopleReceived');

    }
});
