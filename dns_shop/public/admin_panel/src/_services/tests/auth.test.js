describe('Auth Service', function(){

    beforeEach(module('app'));

    var Auth, defaultUser, $scope, $httpBackend, $http, Configuration;
    beforeEach(inject(function(_Auth_, $rootScope, _$httpBackend_, _$http_, _Configuration_){
        Auth = _Auth_;
        Configuration = _Configuration_;
        $scope = $rootScope;
        $httpBackend = _$httpBackend_;
        $http = _$http_;

        defaultUser =  {
                "id": 1,
                "name": "Leanne Graham",
                "username": "Bret",
                "email": "Sincere@april.biz",
                "address": {
                    "street": "Kulas Light",
                    "suite": "Apt. 556",
                    "city": "Gwenborough",
                    "zipcode": "92998-3874",
                    "geo": {
                        "lat": "-37.3159",
                        "lng": "81.1496"
                    }
                },
                "phone": "1-770-736-8031 x56442",
                "website": "hildegard.org",
                "company": {
                    "name": "Romaguera-Crona",
                    "catchPhrase": "Multi-layered client-server neural-net",
                    "bs": "harness real-time e-markets"
                }
        };
    }));

    afterEach(function(){
        try{
            localStorage.clear();
        }finally{}
    });

    it('login()', function(done){
        $httpBackend.expectGET('/data/users.json').respond(defaultUser);
        Auth.login('admin', 'admin').then(
            function(data){
                Auth.logout();
                expect(Configuration.getStorageData('user')).toEqual(null);
                done();
            },
            function(error){
                expect(error).toBe("Sorry, we can't find user with this login and password!");
                done();
            }
        );
        $httpBackend.flush();
        $scope.$digest();
    });

    it('login() fail', function(done){
        $httpBackend.expectGET('/data/users.json').respond(401, "some http error");
        Auth.login('admin', 'admin').then(
            function(data){},
            function(error){
                expect(error.status).toBe(401);
                done();
            }
        );
        $httpBackend.flush();
        $scope.$digest();
    });

    it('user()', function(){
        expect(Auth.user()).toEqual(null);
    })

});