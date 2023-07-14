/// <reference types="cypress" />

describe('Basic Tests For Keyword Density', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/keyword-density')
    });

    it("should correctly get the text input by the user", () => {

      cy.get(".ma-text-area textarea").clear();

      const userInput = "This is a sample sentence. Another sentence for testing.";
      
      cy.get(".ma-text-area textarea").type(userInput);

      cy.get(".ma-convert-button").click();

      
      

      cy.get(".ma-character-counter").contains(`Total Characters: ${userInput.length}`)



      const expectedData = [
    { keyword: "sample", count: 1, density: "11.1" },
    { keyword: "another", count: 1, density: "11.1" },
    { keyword: "testing", count: 1, density: "11.1" },
    { keyword: "sentence", count: 2, density: "22.2" }
  ];
    
    
  cy.get(".ant-table-row").each(($row, index) => {
    cy.wrap($row).find('.ma-default-row').eq(0).should("contain.text", expectedData[index].keyword);
    cy.wrap($row).find(".ant-table-thead").eq(1).should("contain.text", expectedData[index].count);
    cy.wrap($row).find(".ant-table-thead").eq(2).should("contain.text", expectedData[index].density);
  });
    

      cy.get(".ma-keyword-table .ant-table-wrapper .ma-copy-to-clipboard-button").click();

      cy.window().then((window) => {
        cy.stub(window, "navigator", {
          clipboard: {
            writeText: cy.stub().as("writeTextStub"),
          },
        });
    
        cy.get("@writeTextStub").should("be.calledOnce").and("have.been.calledWith", "Keywords,Count,Density\nlorem - felis - lacinia - vitae,2,7.1\nipsum - dolor - sit - amet - consectetur - adipiscing - elit - nunc - ex - volutpat - vestibulum - orci - pharetra - non - nisi - tristique - accumsan - dui,1,3.6");

      });
    });


    it("should display alerts correctly", () => {
      // Test for empty input
      cy.get(".ma-text-area textarea").clear();
      cy.get(".ma-convert-button").click();
      cy.on("window:alert", (message) => {
        expect(message).to.equal("Please write your text! The textbox is empty!");
      });
  
      // Test for single-character input
      
      cy.get(".ma-text-area textarea").clear();
      cy.get(".ma-text-area textarea").type("a");
      cy.get(".ma-convert-button").click();
      cy.on("window:alert", (message) => {
        expect(message).to.equal("Please write a word!");
      });
    });


   
}) 