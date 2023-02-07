package unicauca.edu.co.backendauctionproducts.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import unicauca.edu.co.backendauctionproducts.services.DTO.AuctionDTO;
import unicauca.edu.co.backendauctionproducts.services.IAuctionService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"}, methods= {RequestMethod.GET,RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class AuctionController {

    @Autowired
    private IAuctionService auctionService;

    //crear subasta
    @RequestMapping(value = "/auctions", method = RequestMethod.POST, produces = "application/json")
    @ResponseBody
    public AuctionDTO store(@RequestBody AuctionDTO auction) {
        AuctionDTO objAuction = null;
        objAuction =  auctionService.save(auction);
        return objAuction;
    }

    //crear subasta
    @RequestMapping(value = "auctions/close/{id}", method = RequestMethod.PATCH, produces = "application/json")
    @ResponseBody
    public AuctionDTO close(@PathVariable long id) {
        AuctionDTO objAuction = null;
        objAuction =  auctionService.close(id);
        return objAuction;
    }

}
