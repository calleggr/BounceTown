import java.awt.Color;
import java.awt.Shape;
import java.awt.geom.Point2D;


public interface Character {
	
	
	//Used for changing colors.
	void changeColor();
	
	//Signals that a unit of time has passed
	void timePassed();
	
	
	//Tells the character to move.
	void move();
	
	
	//Gets the characters shape.
	Shape getShape();
	
	
	//Gets the character's color.
	Color getColor();
	
	//Gets the center location
	Point2D getPoint();
	
	//Gets the radius
	int getRadius();
}
